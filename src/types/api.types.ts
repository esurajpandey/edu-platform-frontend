export interface SuccessResponse<T = unknown> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T; // T is a placeholder for the specific data shape
}

export interface ErrorResponse {
  message: string;
  success: boolean;
  statusCode?: number;
}
