import { ITeam, IUser } from './IModels';

type whereObject = {
  where: {
    email: string,
  }
};

export interface IUserPersistence {
  findOne(param: whereObject): Promise<IUser>;
}

export interface IUserRepository {
  findOne(email: string): Promise<IUser>;
}

export interface ITeamPersistence {
  findAll(): Promise<ITeam[]>;
}

export interface ITeamRepository {
  getAll(): Promise<ITeam[]>;
}
