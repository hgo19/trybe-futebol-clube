import User from '../database/models/User';
import { IUserRepository } from '../interfaces/IRepositories';

export default class UserSequelizeRepository implements IUserRepository {
  constructor(private _persistence = User) { }

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
