import { Request, Response } from 'express';
import { ILeaderboardWithEfficiency } from '../interfaces/IBasics';
import { ILeaderboardService } from '../interfaces/IServices';

export default class LeaderboardController {
  constructor(private _leaderboardService: ILeaderboardService<ILeaderboardWithEfficiency>) {}

  getHomeLeaderboard = async (_req: Request, res: Response) => {
    const leaderboard = await this._leaderboardService.getHomeLeaderboard();
    return res.status(200).json(leaderboard);
  };
}
