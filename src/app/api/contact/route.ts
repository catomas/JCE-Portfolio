import { NextResponse } from 'next/server'
import prisma, { withRetry } from '@/lib/prisma'
import { contactSchema } from '@/lib/validations/contact'
import { transporter, mailOptions } from '@/config/nodemailer'

/**
 * Get client IP address from request headers.
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return '127.0.0.1'
}

/**
 * Generate email content from contact form data.
 */
function generateEmailContent(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const text = `
Nuevo mensaje de contacto:

Nombre: ${data.name}
Email: ${data.email}
${data.phone ? `Teléfono: ${data.phone}\n` : ''}Asunto: ${data.subject}

Mensaje:
${data.message}
  `.trim()

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background: #f9fafb; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .header { background: #1f2937; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; }
    .content { padding: 24px; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .field-value { font-size: 16px; color: #1f2937; line-height: 1.5; }
    .message-box { background: #f3f4f6; border-radius: 6px; padding: 16px; margin-top: 16px; }
    .message-box p { margin: 0; font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background: #f9fafb; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nuevo Mensaje de Contacto</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Nombre</div>
        <div class="field-value">${escapeHtml(data.name)}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>
      ${data.phone ? `<div class="field"><div class="field-label">Teléfono</div><div class="field-value">${escapeHtml(data.phone)}</div></div>` : ''}
      <div class="field">
        <div class="field-label">Asunto</div>
        <div class="field-value">${escapeHtml(data.subject)}</div>
      </div>
      <div class="message-box">
        <div class="field-label">Mensaje</div>
        <p>${escapeHtml(data.message)}</p>
      </div>
    </div>
    <div class="footer">
      Este mensaje fue enviado desde el formulario de contacto del portafolio.
    </div>
  </div>
</body>
</html>`

  return { text, html }
}

/**
 * Escape HTML special characters to prevent XSS in email content.
 */
function escapeHtml(str: string): string {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

/**
 * POST /api/contact
 *
 * Handles contact form submissions:
 * 1. Validates input with Zod schema
 * 2. Stores the message in the database
 * 3. Sends notification email to admin via Nodemailer
 *
 * Rate limiting is handled by middleware (5 messages / 15 min per IP).
 *
 * Requirements: 13.2, 13.3, 13.5, 13.7
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Validate input
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors as Record<string, string[]>
      return NextResponse.json(
        {
          success: false,
          error: 'Validación fallida. Por favor, revise los campos del formulario.',
          fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = parsed.data
    const ipAddress = getClientIp(request)

    // 2. Store message in database
    const contactMessage = await withRetry(() =>
      prisma.contactMessage.create({
        data: {
          name,
          email,
          phone: phone ?? null,
          subject,
          message,
          status: 'UNREAD',
          ipAddress,
        },
      })
    )

    // 3. Send notification email to admin (non-blocking - don't fail the request if email fails)
    try {
      const emailContent = generateEmailContent({ name, email, phone, subject, message })
      await transporter.sendMail({
        ...mailOptions,
        subject: `Nuevo mensaje de contacto: ${subject}`,
        ...emailContent,
      })
    } catch (emailError) {
      // Log email error but don't fail the request - message is already stored in DB
      console.error('[Contact API] Error sending notification email:', emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Su mensaje ha sido recibido. Nos pondremos en contacto pronto.',
        id: contactMessage.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Contact API] Error processing contact form:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Error al procesar su mensaje. Por favor, intente nuevamente.',
      },
      { status: 500 }
    )
  }
}
