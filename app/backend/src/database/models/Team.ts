import { Model, DataTypes } from 'sequelize';
import { ITeam } from '../../interfaces/IModels';
import db from '.';

class Team extends Model implements ITeam {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: DataTypes.STRING,
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
  },
);

export default Team;
