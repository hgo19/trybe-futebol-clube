import * as jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

export default class JwtAuth {
  private _secret: string;

  constructor() {
    this._secret = process.env.JWT_SECRET || 'yourScretToken';
  }

  public encodeToken = (email: string) => {
    try {
      const token = jwt.sign(email, this._secret, {
        expiresIn: '5d',
        algorithm: 'HS256',
      });

      return token;
    } catch (error) {
      console.log(error);
    }
  };

  public decodeToken = (token: string) => {
    try {
      const decoded = jwt.verify(token, this._secret) as JwtPayload;
      return decoded;
    } catch (error) {
      console.log(error);
    }
  };
}
