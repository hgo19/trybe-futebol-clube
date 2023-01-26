import { IGoalsTeams, ILeaderboardBasic, ILeaderboardWithEfficiency, IMatchBasic } from './IBasics';

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

export type FinishedMatch = {
  message: string,
};

export type IGoal = {
  message: string
};

export interface IMatchesService<T> {
  getAll(): Promise<T[]>;
  getInProgressOrNoMatches(inProgress: string): Promise<T[]>;
  insert(newMatch: IMatchBasic): Promise<T>;
  finishMatchProgress(id: string): Promise<FinishedMatch>;
  updateMatchGoals(id: string, goals: IGoalsTeams): Promise<IGoal>;
}

export interface ILeaderboardService<T> {
  putEfficiency(leaderboard: ILeaderboardBasic[]): ILeaderboardWithEfficiency[];
  getHomeLeaderboard(): Promise<T[]>;
  getAwayLeaderboard(): Promise<T[]>;
  getFullLeaderboard(): Promise<T[]>;
}
