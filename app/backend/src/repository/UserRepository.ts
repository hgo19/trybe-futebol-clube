import { IUserRepository, IUserPersistence } from '../interfaces/IRepositories';

export default class UserRepository implements IUserRepository {
  constructor(private _persistence: IUserPersistence) { }

  async findOne(email: string) {
    const findOneParam = {
      where: {
        email,
      },
    };
    const user = await this._persistence.findOne(findOneParam);
    return user;
  }
}
