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
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
}

export interface IMatchesService<T> {
  getAll(): Promise<T[]>;
  getInProgressOrNoMatches(inProgress: string): Promise<T[]>;
}
