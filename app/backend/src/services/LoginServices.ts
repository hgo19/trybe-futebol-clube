import { LoginType, ILoginService } from '../interfaces/ILoginService';
import IAuthMethods from '../interfaces/IAuthMethods';
import IUserPersistence from '../interfaces/IRepositories';

export default class LoginServices implements ILoginService {
  constructor(private _authMethods: IAuthMethods, private _userPersistence: IUserPersistence) { }

  public async validateUser(login: LoginType): Promise<string> {
    const { email } = login;
    const userInDB = this._userPersistence.findOne({ where: {
      email,
    } });

    if (!userInDB) throw new Error('Incorrect email or password');

    const token = this._authMethods.encodeToken(email);

    return token;
  }
}
