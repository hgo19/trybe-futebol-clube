import IUser from './IUser';

type whereObject = {
  where: {
    email: string,
    password: string
  }
};

export default interface IUserPersistence {
  findOne(param: whereObject): Promise<IUser>;
}

export interface IUserRepository {
  findOne(email: string, password: string): Promise<IUser>
}
