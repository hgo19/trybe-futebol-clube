export default interface IAuthMethods {
  encodeToken(email: string): string;
  decodeToken(token: string): string;
}
