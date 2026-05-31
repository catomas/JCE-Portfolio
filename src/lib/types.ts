/**
 * Shared types for Server Actions and API responses.
 */

/**
 * Result type for Server Actions.
 * Represents either a successful operation with data, or a failure with error details.
 */
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }

/**
 * Paginated result type for list queries.
 */
export type PaginatedResult<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
