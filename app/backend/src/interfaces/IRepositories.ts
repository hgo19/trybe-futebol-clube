import { ITeam, IUser } from './IModels';

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
//   findAll(): Promise<any>;
//   findOne(param: whereId): Promise<ITeam>;
// }

export interface ITeamRepository {
  getAll(): Promise<ITeam[]>;
  getById(id: string): Promise<ITeam | null>;
}
