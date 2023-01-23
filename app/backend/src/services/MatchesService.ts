import { IMatch } from '../interfaces/IModels';
import { IMatchRepository } from '../interfaces/IRepositories';
import { IMatchesService } from '../interfaces/IServices';

export default class MatchesServices implements IMatchesService<IMatch> {
  constructor(private _matchRepository: IMatchRepository) {}

  async getAll(): Promise<IMatch[]> {
    const allMatches = await this._matchRepository.getAll();
    return allMatches;
  }
}
