import { Request, Response } from 'express';
import { ILoginService } from '../interfaces/ILoginService';

export default class LoginController {
  constructor(private _userService: ILoginService) {}

  login = async (req: Request, res: Response) => {
    const loginPayload = req.body;
    const checkLogin = this._userService.validateUser(loginPayload);
    res.status(200).json({ token: checkLogin });
  };
}
