export enum APP_ERROR_CODES {
  TOAST = 'error-toast'
}

export class AppError extends Error {
  message: string;
  code: string;

  constructor(message: string, code: string = APP_ERROR_CODES.TOAST) {
    super();
    this.code = code;
    this.message = message;
  }
}
