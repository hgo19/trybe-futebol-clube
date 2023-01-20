'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id',
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'username',
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'role',
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'email',
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'password',
      }

    });
  },

  down: async (queryInterface, _Sequelize) => {
     await queryInterface.dropTable('users');
  }
};
