import { Request, Response } from 'express';
import { ITeam } from '../interfaces/IModels';
import { ITeamsService } from '../interfaces/IServices';

export default class TeamController {
  constructor(private _teamService: ITeamsService<ITeam>) {}

  getAll = async (_req: Request, res: Response) => {
    const allTeams = await this._teamService.getAll();
    return res.status(200).json(allTeams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._teamService.getById(id);
    return res.status(200).json(team);
  };
}
