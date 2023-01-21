export default interface IAuthMethods {
  encodeToken(email: string, password: string): string;
  decodeToken(token: string): string;
}
