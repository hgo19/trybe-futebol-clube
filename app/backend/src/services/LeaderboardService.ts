import { ILeaderboardBasic, ILeaderboardWithEfficiency } from '../interfaces/IBasics';
import { ILeaderboardRepository } from '../interfaces/IRepositories';
import { ILeaderboardService } from '../interfaces/IServices';

export default class LeaderboardService implements ILeaderboardService<ILeaderboardWithEfficiency> {
  constructor(private _leaderboardRepository: ILeaderboardRepository) {}

  putEfficiency = (leaderboard: ILeaderboardBasic[]): ILeaderboardWithEfficiency[] => {
    const treatment = leaderboard.map((e) => {
      const efficiencyDecimal = e.totalPoints / (e.totalGames * 3);
      const efficiencyPercentage = efficiencyDecimal * 100;

      return {
        ...e,
        efficiency: `${efficiencyPercentage.toFixed(2)}`,
      };
    });

    return treatment;
  };

  async getHomeLeaderboard(): Promise<ILeaderboardWithEfficiency[]> {
    const leaderboard = await this._leaderboardRepository.getHomeLeaderboard();
    const leaderboardWithEfficiency = this.putEfficiency(leaderboard);
    return leaderboardWithEfficiency;
  }

  async getAwayLeaderboard(): Promise<ILeaderboardWithEfficiency[]> {
    const leaderboard = await this._leaderboardRepository.getAwayLeaderboard();
    const leaderboardWithEfficiency = this.putEfficiency(leaderboard);
    return leaderboardWithEfficiency;
  }
}
