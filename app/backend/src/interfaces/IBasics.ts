export interface IGoalsTeams {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchBasic extends IGoalsTeams{
  homeTeamId: number;
  awayTeamId: number;
}

export interface ILeaderboardBasic {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
}

export interface ILeaderboardWithEfficiency extends ILeaderboardBasic {
  efficiency: string;
}
