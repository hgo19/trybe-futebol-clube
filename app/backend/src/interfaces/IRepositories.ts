import { IGoalsTeams, ILeaderboardBasic, IMatchBasic } from './IBasics';
import { IMatch, ITeam, IUser } from './IModels';

// type whereEmail = {
//   where: {
//     email: string,
//   }
// };

// export interface IUserPersistence {
//   findOne(param: whereEmail): Promise<IUser>;
// }

export interface IUserRepository {
  findOne(email: string): Promise<IUser | null>;
}

// type whereId = {
//   where: {
//     id: string,
//   }
// };

// export interface ITeamPersistence {
//   findAll(): Promise<ITeam[]>;
//   findOne(param: whereId): Promise<ITeam>;
// }

export interface ITeamRepository {
  getAll(): Promise<ITeam[]>;
  getById(id: string): Promise<ITeam | null>;
}

export interface IMatchRepository {
  getAll(): Promise<IMatch[]>;
  getById(id: string): Promise<IMatch>;
  getInProgressOrNoMatches(inProgress: boolean): Promise<IMatch[]>;
  insert(newMatch: IMatchBasic): Promise<IMatch>;
  updateMatchProgress(id: string): Promise<[affectedCount: number]>;
  updateMatchGoals(id: string, goals: IGoalsTeams): Promise<[affectedCount: number]>;
}

export interface ILeaderboardRepository {
  getHomeLeaderboard(): Promise<ILeaderboardBasic[]>;
  getAwayLeaderboard(): Promise<ILeaderboardBasic[]>;
}
