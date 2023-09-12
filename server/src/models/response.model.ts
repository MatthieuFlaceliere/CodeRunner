export interface IResponse {
  status: string;
  message: string;
  data?: string | object | null;
  statusCode?: number;
}

export interface IResponseError {
  status: string;
  message: string;
  statusCode: number;
}
