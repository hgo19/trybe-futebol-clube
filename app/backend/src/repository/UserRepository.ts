import IUserPersistence from '../interfaces/IRepositories';

export default class UserRepository {
  constructor(private persistence: IUserPersistence) { }

  async findOne(email: string) {
    const findOneParam = {
      where: {
        email,
      },
    };
    const user = await this.persistence.findOne(findOneParam);

    return user;
  }
}
