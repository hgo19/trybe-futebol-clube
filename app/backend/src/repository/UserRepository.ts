import IUserPersistence, { IUserRepository } from '../interfaces/IRepositories';

export default class UserRepository implements IUserRepository {
  constructor(private persistence: IUserPersistence) { }

  async findOne(email: string, password: string) {
    const findOneParam = {
      where: {
        email,
        password,
      },
    };
    const user = await this.persistence.findOne(findOneParam);
    return user;
  }
}
