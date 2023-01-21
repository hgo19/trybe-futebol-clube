export type LoginType = {
  email: string,
  password: string;
};

export interface ILoginService {
  validateUserInDB(login: LoginType): Promise<void>;
  login(login: LoginType): Promise<string>;
}
