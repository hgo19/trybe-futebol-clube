import { ITeamRepository, ITeamPersistence } from '../interfaces/IRepositories';

export default class TeamRepository implements ITeamRepository {
  constructor(private _persistence: ITeamPersistence) {}

  async getAll() {
    const allTeams = await this._persistence.findAll();
    return allTeams;
  }
}
