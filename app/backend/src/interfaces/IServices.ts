export type LoginType = {
  email: string,
  password: string;
};

export type ValidateTokenReturn = {
  role: string
};

export interface ILoginService {
  validateUserInDB(login: LoginType): Promise<void>;
  login(login: LoginType): Promise<string>;
  validateToken(token: string): Promise<ValidateTokenReturn>
}

export interface ITeamsService<T> {
  getAll(): Promise<T>;
}
