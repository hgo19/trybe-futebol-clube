import { LoginType, ILoginService } from '../interfaces/ILoginService';
import IAuthMethods from '../interfaces/IAuthMethods';
import { IUserRepository } from '../interfaces/IRepositories';

export default class LoginService implements ILoginService {
  constructor(private _authMethods: IAuthMethods, private _userPersistence: IUserRepository) { }

  public async validateUser(login: LoginType): Promise<string> {
    const { email } = login;
    const userInDB = this._userPersistence.findOne(email);

    if (!userInDB) throw new Error('Incorrect email or password');

    const token = this._authMethods.encodeToken(email);

    return token;
  }
}
