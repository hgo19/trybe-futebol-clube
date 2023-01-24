import HttpException from '../utils/errorsHandler/HttpException';
import IMatchBasic from '../interfaces/IMatchBasic';
import { IMatch } from '../interfaces/IModels';
import { IMatchRepository, ITeamRepository } from '../interfaces/IRepositories';
import { FinishedMatch, IMatchesService } from '../interfaces/IServices';

export default class MatchesServices implements IMatchesService<IMatch> {
  constructor(
    private _matchRepository: IMatchRepository,
    private _teamRepository: ITeamRepository,
  ) {}

  async getAll(): Promise<IMatch[]> {
    const allMatches = await this._matchRepository.getAll();
    return allMatches;
  }

  async getInProgressOrNoMatches(inProgress: string): Promise<IMatch[]> {
    const checkProgress = inProgress === 'true';
    const matches = await this._matchRepository.getInProgressOrNoMatches(checkProgress);
    return matches;
  }

  async insert(newMatch: IMatchBasic): Promise<IMatch> {
    const { homeTeamId, awayTeamId } = newMatch;
    if (homeTeamId === awayTeamId) {
      throw new HttpException('It is not possible to create a match with two equal teams', 422);
    }

    const findHomeTeam = await this._teamRepository.getById(`${homeTeamId}`);
    const findAwayTeam = await this._teamRepository.getById(`${homeTeamId}`);

    if (!findHomeTeam || !findAwayTeam) {
      throw new HttpException('There is no team with such id!', 404);
    }

    const createdMatch = await this._matchRepository.insert(newMatch);
    return createdMatch;
  }

  async finishMatchProgress(id: string): Promise<FinishedMatch> {
    const updatedMatch = await this._matchRepository.updateMatchProgress(id);
    if (!updatedMatch) {
      throw new HttpException('Algum problema ao alterar status da partida aconteceu.', 400);
    }

    return { message: 'Finished' };
  }
}
