import { IResponse, IResponseError } from '../models/response.model';

export const successResponse = (data: string | object, message?: string): IResponse => {
  return {
    status: 'success',
    message: message || 'OK',
    data: data,
  };
};

export const errorResponse = (message: string, statusCode: number): IResponseError => {
  return {
    status: 'error',
    message: message,
    statusCode: statusCode,
  };
};

export default {
  successResponse,
  errorResponse,
};
