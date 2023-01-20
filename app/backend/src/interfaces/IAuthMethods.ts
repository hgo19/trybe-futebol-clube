import type { JwtPayload } from 'jsonwebtoken';

export default interface IAuthMethods {
  encodeToken(email: string): string;
  decodeToken(token: string): JwtPayload;
}
