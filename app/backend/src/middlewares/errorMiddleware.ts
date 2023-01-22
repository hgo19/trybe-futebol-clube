import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/errorsHandler/HttpException';

const errorMiddleware = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.log(error);
  const { message, statusCode } = error;
  if (statusCode) return res.status(statusCode).json({ message });
  return res.status(500).json({ message: 'Erro inesperado' });
};

export default errorMiddleware;
