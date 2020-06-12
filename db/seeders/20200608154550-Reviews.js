'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews',
      [

        {
          posterId: 1,
          pokeId: 1,
          content: 'Bulbasaur is the best!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          posterId: 1,
          pokeId: 700,
          content: 'I lied, sylveon is the best',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          posterId: 1,
          pokeId: 700,
          content: 'Trans rights!',
          createdAt: new Date(),
          updatedAt: new Date()
        }

      ], {});
  },


  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Reviews', null, {});

  }
};
