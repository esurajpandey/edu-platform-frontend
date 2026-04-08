export interface SuccessResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T; // T is a placeholder for the specific data shape
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
