import { Request, Response } from 'express';
import { ILoginService } from '../interfaces/IServices';

export default class LoginController {
  constructor(private _userService: ILoginService) {}

  login = async (req: Request, res: Response) => {
    const loginPayload = req.body;
    const checkLogin = await this._userService.login(loginPayload);

    res.status(200).json({ token: checkLogin });
  };

  loginValidate = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    if (token) {
      const { role } = await this._userService.validateToken(token);
      res.status(200).json({ role });
    }
  };
}
