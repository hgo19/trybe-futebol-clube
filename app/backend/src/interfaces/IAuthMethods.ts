export type DecodeReturn = {
  id: number,
  email: string,
  role: string,
};

export default interface IAuthMethods {
  encodeToken(id: number, email: string, role: string): string;
  decodeToken(token: string): DecodeReturn;
}
