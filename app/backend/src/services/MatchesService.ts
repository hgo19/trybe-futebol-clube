import IMatchBasic from '../interfaces/IMatchBasic';
import { IMatch } from '../interfaces/IModels';
import { IMatchRepository } from '../interfaces/IRepositories';
import { IMatchesService } from '../interfaces/IServices';

export default class MatchesServices implements IMatchesService<IMatch> {
  constructor(private _matchRepository: IMatchRepository) {}

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
    const createdMatch = await this._matchRepository.insert(newMatch);
    return createdMatch;
  }
}
