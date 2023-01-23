import { ITeamPersistence } from '../interfaces/IRepositories';
import { ITeam } from '../interfaces/IModels';
import { ITeamsService } from '../interfaces/IServices';

export default class TeamsService implements ITeamsService<ITeam> {
  constructor(private _teamPersistence: ITeamPersistence) { }

  async getAll() {
    const allTeams = await this._teamPersistence.findAll();
    return allTeams;
  }
}
