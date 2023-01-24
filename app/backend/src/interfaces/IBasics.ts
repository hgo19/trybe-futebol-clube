export interface IGoalsTeams {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface IMatchBasic extends IGoalsTeams{
  homeTeamId: number;
  awayTeamId: number;
}
