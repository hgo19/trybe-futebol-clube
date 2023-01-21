import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/errorsHandler/HttpException';

const errorMiddleware = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { message, statusCode } = error;
  res.status(statusCode).json({ message });
};

export default errorMiddleware;
