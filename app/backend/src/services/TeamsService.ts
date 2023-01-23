import { ITeamRepository } from '../interfaces/IRepositories';
import { ITeam } from '../interfaces/IModels';
import { ITeamsService } from '../interfaces/IServices';
import HttpException from '../utils/errorsHandler/HttpException';

export default class TeamsService implements ITeamsService<ITeam> {
  constructor(private _teamRepository: ITeamRepository) { }

  async getAll() {
    const allTeams = await this._teamRepository.getAll();
    return allTeams;
  }

  async getById(id: string): Promise<ITeam> {
    const team = await this._teamRepository.getById(id);
    if (!team) throw new HttpException('Time inexistente no banco de dados.', 400);
    return team;
  }
}
