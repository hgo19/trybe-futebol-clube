export type DecodeReturn = {
  email: string,
  password: string,
};

export default interface IAuthMethods {
  encodeToken(email: string): string;
  decodeToken(token: string): DecodeReturn;
}
