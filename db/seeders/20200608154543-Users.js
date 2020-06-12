'use strict';

const bcrypt = require('bcryptjs');


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
      [
        {
          email: 'test@test.com',
          hashedPassword: bcrypt.hashSync('test'),
          userName: 'TestUser',
          birthday: new Date('01-01-2000'),
          pronouns: 'they/them/theirs',
          collection: ['sylveon'],
          friends: [0],
          groups: [0],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});

  }
};
