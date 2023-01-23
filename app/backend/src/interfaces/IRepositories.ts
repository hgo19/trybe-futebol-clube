import { ITeam, IUser } from './IModels';

type whereEmail = {
  where: {
    email: string,
  }
};

export interface IUserPersistence {
  findOne(param: whereEmail): Promise<IUser>;
}

export interface IUserRepository {
  findOne(email: string): Promise<IUser>;
}

type whereId = {
  where: {
    id: number,
  }
};

export interface ITeamPersistence {
  findAll(): Promise<any>;
  findOne(param: whereId): Promise<ITeam>;
}

export interface ITeamRepository {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam>;
}
