import HttpException from '../utils/errorsHandler/HttpException';
import { IMatch } from '../interfaces/IModels';
import Match from '../database/models/Match';
import { IMatchRepository } from '../interfaces/IRepositories';
import Team from '../database/models/Team';
import IMatchBasic from '../interfaces/IMatchBasic';

export default class MatchSequelizeRepository implements IMatchRepository {
  constructor(private _persistence = Match) { }

  async getAll(): Promise<IMatch[]> {
    const allMatches = await this._persistence.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  async getById(id: string): Promise<IMatch> {
    const whereId = {
      where: {
        id,
      },
    };
    const match = await this._persistence.findOne(whereId);

    if (match) return match;

    throw new HttpException('Partida não encontrada', 404);
  }

  async getInProgressOrNoMatches(inProgress: boolean): Promise<IMatch[]> {
    const inProgressMatches = await this._persistence.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return inProgressMatches;
  }

  async insert(newMatch: IMatchBasic): Promise<IMatch> {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = newMatch;
    const createdMatch = await this._persistence.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    });

    return createdMatch;
  }
}
