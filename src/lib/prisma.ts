import { PrismaClient } from '@prisma/client'

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 2000

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

// eslint-disable-next-line no-var
declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  let lastError: Error | undefined
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
      }
    }
  }
  throw lastError
}
