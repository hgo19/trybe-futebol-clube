export type LoginType = {
  email: string,
  password: string;
};

export interface ILoginService {
  validateUser(token: LoginType): Promise<string>;
}
