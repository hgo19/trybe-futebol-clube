import { ILeaderboardRepository } from '../interfaces/IRepositories';
import homeLeaderboardQuery from '../utils/sqlQueries/homeTeamLeaderboard';
import model from '../database/models';
import { ILeaderboardBasic } from '../interfaces/IBasics';

export default class LeaderBoardSequelizeRepository implements ILeaderboardRepository {
  constructor(private _persistence = model) {}
  async getHomeLeaderboard() {
    const leaderBoard = await this._persistence.query(homeLeaderboardQuery);
    return leaderBoard as ILeaderboardBasic[];
  }
}
