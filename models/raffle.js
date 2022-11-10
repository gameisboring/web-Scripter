'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Raffle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Raffle.init({
    useSound: DataTypes.BOOLEAN,
    numLength: DataTypes.INTEGER,
    numRange: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Raffle',
  });
  return Raffle;
};