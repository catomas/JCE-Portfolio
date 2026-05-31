import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export default cloudinary

// Image transformation presets
export const TRANSFORMATIONS = {
  thumbnail: { width: 150, crop: 'fill' as const, format: 'webp' as const, quality: 'auto' as const },
  medium: { width: 600, crop: 'fill' as const, format: 'webp' as const, quality: 'auto' as const },
  large: { width: 1200, crop: 'fill' as const, format: 'webp' as const, quality: 'auto' as const },
} as const

// Upload configuration
export const UPLOAD_FOLDER = 'jce-portfolio'

export const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB
  video: 50 * 1024 * 1024, // 50MB
} as const

export const ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'] as const
export const ALLOWED_VIDEO_FORMATS = ['mp4', 'webm'] as const

/**
 * Upload a file to Cloudinary
 */
export async function uploadToCloudinary(
  file: Buffer,
  options: {
    folder?: string
    resourceType?: 'image' | 'video'
    publicId?: string
  } = {}
): Promise<{ url: string; publicId: string; thumbnailUrl?: string; mediumUrl?: string; largeUrl?: string }> {
  const { folder = UPLOAD_FOLDER, resourceType = 'image', publicId } = options

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: publicId,
        eager: resourceType === 'image'
          ? [TRANSFORMATIONS.thumbnail, TRANSFORMATIONS.medium, TRANSFORMATIONS.large]
          : undefined,
      },
      (error, result) => {
        if (error) {
          reject(new Error(error.message))
          return
        }
        if (!result) {
          reject(new Error('Upload failed: no result returned'))
          return
        }

        const response: { url: string; publicId: string; thumbnailUrl?: string; mediumUrl?: string; largeUrl?: string } = {
          url: result.secure_url,
          publicId: result.public_id,
        }

        if (result.eager && result.eager.length >= 3) {
          response.thumbnailUrl = result.eager[0].secure_url
          response.mediumUrl = result.eager[1].secure_url
          response.largeUrl = result.eager[2].secure_url
        }

        resolve(response)
      }
    )

    uploadStream.end(file)
  })
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
}

/**
 * Get a transformed URL for an existing image
 */
export function getTransformedUrl(
  publicId: string,
  transformation: keyof typeof TRANSFORMATIONS
): string {
  return cloudinary.url(publicId, {
    ...TRANSFORMATIONS[transformation],
    secure: true,
  })
}
