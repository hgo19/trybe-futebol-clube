import * as jwt from 'jsonwebtoken';
import IAuthMethods from '../interfaces/IAuthMethods';

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

  public decodeToken(token: string): string {
    try {
      const decoded = jwt.verify(token, this._secret) as string;
      return decoded;
    } catch (error) {
      console.log(error);
      throw new Error('Falha ao executar o método decodeToken.');
    }
  }
}
