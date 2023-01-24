import { Request, Response } from 'express';
import { IMatch } from '../interfaces/IModels';
import { IMatchesService } from '../interfaces/IServices';

export default class MatchController {
  constructor(private _matchService: IMatchesService<IMatch>) {}

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress && typeof inProgress === 'string') {
      const matches = await this._matchService.getInProgressOrNoMatches(inProgress);
      return res.status(200).json(matches);
    }
    const allMatches = await this._matchService.getAll();
    return res.status(200).json(allMatches);
  };

  insert = async (req: Request, res: Response) => {
    const newMatch = req.body;
    const createdMatch = await this._matchService.insert(newMatch);
    res.status(201).json(createdMatch);
  };
}
