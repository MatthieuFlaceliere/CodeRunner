export interface IResponse {
  status: string;
  message: string;
  data?: string | object;
  statusCode?: number;
}

export interface IResponseError {
  status: string;
  message: string;
  statusCode: number;
}
