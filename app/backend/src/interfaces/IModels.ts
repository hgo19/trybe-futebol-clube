import IMatchBasic from './IMatchBasic';

export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatch extends IMatchBasic{
  id: number;
  inProgress: boolean;
}
