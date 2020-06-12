'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    posterId: DataTypes.INTEGER,
    pokeId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: 'posterId' })
  };
  return Review;
};
