'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        unique: true,
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      userName: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      pronouns: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      collection: {
        type: Sequelize.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: true,
      },
      friends: {
        type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER),
        allowNull: false,
      },
      groups: {
        type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
