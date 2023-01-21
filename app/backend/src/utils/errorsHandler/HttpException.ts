export default class HttpException extends Error {
  private readonly _statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this._statusCode = statusCode;
  }

  public get statusCode() {
    return this._statusCode;
  }

  errStatusCode() {
    switch (this._statusCode) {
      case 400:
        return 'Bad Request';

      case 401:
        return 'Unauthorized';

      case 404:
        return 'Not Found';

      case 500:
        return 'Internal Server Error';

      default:
        return 'A big error happend';
    }
  }

  public errorType() {
    const err = new Error(this.message);
    err.name = this.errStatusCode();

    throw err;
  }
}
