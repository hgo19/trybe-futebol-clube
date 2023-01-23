import { IMatch } from '../interfaces/IModels';
import Match from '../database/models/Match';
import { IMatchRepository } from '../interfaces/IRepositories';
import Team from '../database/models/Team';

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
}
