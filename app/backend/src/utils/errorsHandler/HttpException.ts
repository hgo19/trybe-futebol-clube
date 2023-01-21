export default class HttpException extends Error {
  private _statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this._statusCode = statusCode;
    super.name = this.getErrName();
  }

  public get statusCode() {
    return this._statusCode;
  }

  private getErrName() {
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
}
