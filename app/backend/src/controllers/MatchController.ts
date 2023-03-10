import { Request, Response } from 'express';
import IAuthMethods from '../interfaces/IAuthMethods';
import { IMatch } from '../interfaces/IModels';
import { IMatchesService } from '../interfaces/IServices';

export default class MatchController {
  constructor(private _matchService: IMatchesService<IMatch>, private _authMethods: IAuthMethods) {}

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
    const token = req.header('Authorization');

    if (token) await this._authMethods.decodeToken(token);

    const createdMatch = await this._matchService.insert(newMatch);
    return res.status(201).json(createdMatch);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { message } = await this._matchService.finishMatchProgress(id);
    return res.status(200).json(message);
  };

  updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const goals = req.body;
    console.log(goals);

    const { message } = await this._matchService.updateMatchGoals(id, goals);
    return res.status(200).json(message);
  };
}
