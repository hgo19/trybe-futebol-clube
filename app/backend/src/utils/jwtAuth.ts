import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import AuthMethods from '../interfaces/IAuthMethods';

export default class JwtAuth implements AuthMethods {
  private _secret: string;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'yourScretToken';
  }

  public encodeToken = (email: string): string => {
    try {
      const token = jwt.sign(email, this._secret, {
        expiresIn: '5d',
        algorithm: 'HS256',
      });

      return token;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao executar o método encodeToken.');
    }
  };

  public decodeToken = (token: string): JwtPayload => {
    try {
      const decoded = jwt.verify(token, this._secret) as JwtPayload;
      return decoded;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao executar o método decodeToken.');
    }
  };
}
