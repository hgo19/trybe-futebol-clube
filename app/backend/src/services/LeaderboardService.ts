import { ILeaderboardWithEfficiency } from '../interfaces/IBasics';
import { ILeaderboardRepository } from '../interfaces/IRepositories';
import { ILeaderboardService } from '../interfaces/IServices';

export default class LeaderboardService implements ILeaderboardService<ILeaderboardWithEfficiency> {
  constructor(private _leaderboardRepository: ILeaderboardRepository) {}

  async getHomeLeaderboard(): Promise<ILeaderboardWithEfficiency[]> {
    const leaderboard = await this._leaderboardRepository.getHomeLeaderboard();
    const putEfficiency = leaderboard.map((e) => {
      const efficiencyDecimal = e.totalPoints / (e.totalGames * 3);
      const efficiencyPercentage = efficiencyDecimal * 100;

      return {
        ...e,
        efficiency: `${efficiencyPercentage.toFixed(2)}`,
      };
    });

    return putEfficiency;
  }
}
