import * as bcrypt from 'bcryptjs';

import HttpException from '../utils/errorsHandler/HttpException';
import { LoginType, ILoginService } from '../interfaces/ILoginService';
import IAuthMethods from '../interfaces/IAuthMethods';
import { IUserRepository } from '../interfaces/IRepositories';

export default class LoginService implements ILoginService {
  constructor(private _authMethods: IAuthMethods, private _userPersistence: IUserRepository) { }

  public async validateUser(login: LoginType): Promise<string> {
    const { email, password } = login;
    const userInDB = await this._userPersistence.findOne(email);

    if (!userInDB) throw new Error('Incorrect email or password');

    const comparePasswords = await bcrypt.compare(password, userInDB.password);

    if (!comparePasswords) throw new HttpException('Incorrect email or password', 401);

    const token = this._authMethods.encodeToken(email, password);

    return token;
  }
}
