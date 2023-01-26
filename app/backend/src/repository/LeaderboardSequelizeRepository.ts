import model from '../database/models';
import { ILeaderboardRepository } from '../interfaces/IRepositories';
import { ILeaderboardBasic } from '../interfaces/IBasics';

import awayLeaderboardQuery from '../utils/sqlQueries/awayTeamLeaderboard';
import homeLeaderboardQuery from '../utils/sqlQueries/homeTeamLeaderboard';

export default class LeaderboardSequelizeRepository implements ILeaderboardRepository {
  constructor(private _persistence = model) {}

  async getHomeLeaderboard() {
    const [leaderBoard] = await this._persistence.query(homeLeaderboardQuery);
    return leaderBoard as ILeaderboardBasic[];
  }

  async getAwayLeaderboard() {
    const [leaderBoard] = await this._persistence.query(awayLeaderboardQuery);
    return leaderBoard as ILeaderboardBasic[];
  }
}
