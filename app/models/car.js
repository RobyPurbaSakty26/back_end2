'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init(
    {
      nama: DataTypes.STRING,
      sewa_per_hari: DataTypes.INTEGER,
      ukuran: DataTypes.STRING,
      foto: DataTypes.STRING,
      createBy: DataTypes.INTEGER,
      updateBy: DataTypes.INTEGER,
      deleteBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Car',
    }
  );
  return Car;
};
