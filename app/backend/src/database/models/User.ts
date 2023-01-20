import { Model, DataTypes } from 'sequelize';
import IUserModel from '../../interfaces/IUserModel';
import db from '.';

class User extends Model implements IUserModel {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'users',
    timestamps: false,
  },
);

export default User;
