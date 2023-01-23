import Team from '../database/models/Team';
import { ITeam } from '../interfaces/IModels';
import { ITeamRepository } from '../interfaces/IRepositories';

export default class TeamSequelizeRepository implements ITeamRepository {
  constructor(private _persistence = Team) {}

  async getAll(): Promise<ITeam[]> {
    const allTeams = await this._persistence.findAll();
    return allTeams;
  }

  async getById(id: string): Promise<ITeam | null> {
    const whereId = {
      where: {
        id,
      },
    };
    const findTeam = await this._persistence.findOne(whereId);
    return findTeam;
  }
}
