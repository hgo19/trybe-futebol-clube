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

  sumTeamOverallStats = (
    awayTeam: ILeaderboardWithEfficiency,
    homeTeam: ILeaderboardWithEfficiency,
  ) => ({
    name: awayTeam.name,
    totalPoints: +awayTeam.totalPoints + +homeTeam.totalPoints,
    totalGames: +awayTeam.totalGames + +homeTeam.totalGames,
    totalVictories: +awayTeam.totalVictories + +homeTeam.totalVictories,
    totalDraws: +awayTeam.totalDraws + +homeTeam.totalDraws,
    totalLosses: +awayTeam.totalLosses + +homeTeam.totalLosses,
    goalsFavor: +awayTeam.goalsFavor + +homeTeam.goalsFavor,
    goalsOwn: +awayTeam.goalsOwn + +homeTeam.goalsOwn,
    goalsBalance: +awayTeam.goalsBalance + +homeTeam.goalsBalance,
  });

  joinLeaderboards = (
    homeLeaderboard: ILeaderboardWithEfficiency[],
    awayLeaderboard: ILeaderboardWithEfficiency[],
  ) => {
    const fullLeaderboard = homeLeaderboard.map((homeTeam) => {
      const [newLeaderboard] = awayLeaderboard
        .filter((awayTeam) => awayTeam.name === homeTeam.name);

      return this.sumTeamOverallStats(newLeaderboard, homeTeam);
    });
    return fullLeaderboard;
  };

  // sortLeaderboard = (a: ILeaderboardWithEfficiency, b: ILeaderboardWithEfficiency) => {
  //   if (a.totalPoints === b.totalPoints && a.goalsBalance > b.goalsBalance) {
  //     return a.goalsBalance - b.goalsBalance;
  //   }
  //   if (a.totalPoints === b.totalPoints
  //     && a.goalsBalance === b.goalsBalance
  //     && a.goalsFavor > b.goalsFavor) {
  //     return b.goalsFavor - a.goalsFavor;
  //   }

  //   if (a.totalPoints === b.totalPoints
  //     && a.goalsBalance === b.goalsBalance
  //     && a.goalsFavor === b.goalsFavor) {
  //     return b.goalsOwn - a.goalsOwn;
  //   }

  //   return b.totalPoints - a.totalPoints;
  // };

  // sortLeaderboard = (
  //   a: ILeaderboardWithEfficiency,
  //   b: ILeaderboardWithEfficiency,
  // ) => b.totalPoints - a.totalPoints
  //   || b.totalVictories - a.totalVictories
  //   || b.goalsBalance - a.goalsBalance
  //   || b.goalsFavor - a.goalsFavor
  //   || a.goalsOwn - b.goalsOwn;

  sortLeaderboard = (a: ILeaderboardWithEfficiency, b: ILeaderboardWithEfficiency) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
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

  async getFullLeaderboard(): Promise<ILeaderboardWithEfficiency[]> {
    const homeLeaderboard = await this.getHomeLeaderboard();
    const awayLeaderboard = await this.getAwayLeaderboard();
    const fullLeaderboard = this.joinLeaderboards(homeLeaderboard, awayLeaderboard);
    const leaderboardWithEfficiency = this.putEfficiency(fullLeaderboard);
    return leaderboardWithEfficiency
      .sort(this.sortLeaderboard);
  }
}
