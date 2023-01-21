import * as bcrypt from 'bcryptjs';

import HttpException from '../utils/errorsHandler/HttpException';
import { LoginType, ILoginService } from '../interfaces/ILoginService';
import IAuthMethods from '../interfaces/IAuthMethods';
import { IUserRepository } from '../interfaces/IRepositories';

export default class LoginService implements ILoginService {
  constructor(private _authMethods: IAuthMethods, private _userPersistence: IUserRepository) { }

  public async validateUserInDB(login: LoginType): Promise<void> {
    const { email, password } = login;
    const userInDB = await this._userPersistence.findOne(email);
    if (!userInDB) throw new HttpException('Incorrect email or password', 401);

    const comparePasswords = await bcrypt.compare(password, userInDB.password);
    if (!comparePasswords) throw new HttpException('Incorrect email or password', 401);
  }

  public async login(login: LoginType): Promise<string> {
    await this.validateUserInDB(login);
    const token = this._authMethods.encodeToken(login.email, login.password);
    return token;
  }
}
