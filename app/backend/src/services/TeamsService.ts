import { ITeamRepository } from '../interfaces/IRepositories';
import { ITeam } from '../interfaces/IModels';
import { ITeamsService } from '../interfaces/IServices';

export default class TeamsService implements ITeamsService<ITeam> {
  constructor(private _teamRepository: ITeamRepository) { }

  async getAll() {
    const allTeams = await this._teamRepository.getAll();
    return allTeams;
  }
}
