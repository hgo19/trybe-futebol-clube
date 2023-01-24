import * as jwt from 'jsonwebtoken';

import IAuthMethods, { DecodeReturn } from '../interfaces/IAuthMethods';
import HttpException from './errorsHandler/HttpException';

export default class JwtAuth implements IAuthMethods {
  private _secret: string;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'yourScretToken';
  }

  public encodeToken(email: string, password: string): string {
    try {
      const token = jwt.sign({ email, password }, this._secret, {
        expiresIn: '1d',
        algorithm: 'HS256',
      });

      return token;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao executar o método encodeToken.');
    }
  }

  public decodeToken(token: string): DecodeReturn {
    try {
      const decoded = jwt.verify(token, this._secret) as DecodeReturn;
      return decoded;
    } catch (error) {
      console.log(error);
      throw new HttpException('Token must be a valid token', 401);
    }
  }
}
