/**
 * Standard API Response
 */
export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

/**
 * Pagination Metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Standard Paginated API Response
 */
export interface PaginatedApiResponse<T> {
  success: true;
  message: string;
  data: T;
  pagination: PaginationMeta;
}