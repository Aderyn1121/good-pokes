'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    userName: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    pronouns: DataTypes.STRING,
    collection: DataTypes.ARRAY(DataTypes.STRING),
    friends: DataTypes.ARRAY(DataTypes.INTEGER),
    groups: DataTypes.ARRAY(DataTypes.INTEGER),
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Review, { foreignKey: 'posterId' })
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return User;
};
