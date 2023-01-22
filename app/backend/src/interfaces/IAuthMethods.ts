export type DecodeReturn = {
  email: string,
  password: string,
};

export default interface IAuthMethods {
  encodeToken(email: string, password: string): string;
  decodeToken(token: string): DecodeReturn;
}
