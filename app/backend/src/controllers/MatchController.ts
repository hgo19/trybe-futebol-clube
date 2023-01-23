import { Request, Response } from 'express';
import { IMatch } from '../interfaces/IModels';
import { IMatchesService } from '../interfaces/IServices';

export default class MatchController {
  constructor(private _matchService: IMatchesService<IMatch>) {}

  getAll = async (_req: Request, res: Response) => {
    const allMatches = await this._matchService.getAll();
    return res.status(200).json(allMatches);
  };
}
