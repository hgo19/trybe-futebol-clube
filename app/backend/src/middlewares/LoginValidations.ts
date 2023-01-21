import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/errorsHandler/HttpException';
import ValidationsInputs from './validations/ValidationsInput';

export default class LoginValidations {
  static validateLoginInputs = (req: Request, _res: Response, next: NextFunction) => {
    const { isError, message } = ValidationsInputs.validateLogin(req.body);

    if (!isError) return next();

    throw new HttpException(message, 400);
  };
}
