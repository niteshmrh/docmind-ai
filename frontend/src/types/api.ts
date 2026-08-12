export interface ApiResponse<T> {
  success: boolean;
  message: string;
  result: T;
  count: number;
  responseId: string;
}
