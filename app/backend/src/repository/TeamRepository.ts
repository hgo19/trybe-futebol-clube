import { ITeam } from '../interfaces/IModels';
import { ITeamRepository, ITeamPersistence } from '../interfaces/IRepositories';

export default class TeamRepository implements ITeamRepository {
  constructor(private _persistence: ITeamPersistence) {}

  async getAll() {
    const allTeams = await this._persistence.findAll();
    return allTeams;
  }

  async getById(id: number): Promise<ITeam> {
    const whereId = {
      where: {
        id,
      },
    };
    const findTeam = await this._persistence.findOne(whereId);
    return findTeam;
  }
}
