import IUser from './IUser';

type whereObject = {
  where: {
    email: string,
  }
};

export default interface IUserPersistence {
  findOne(param: whereObject): Promise<IUser>;
}
