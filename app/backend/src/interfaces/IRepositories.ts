import { IUser } from './IModels';

type whereObject = {
  where: {
    email: string,
  }
};

export default interface IUserPersistence {
  findOne(param: whereObject): Promise<IUser>;
}

export interface IUserRepository {
  findOne(email: string): Promise<IUser>
}
