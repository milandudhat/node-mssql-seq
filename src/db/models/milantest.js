'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class milantests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  milantests.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    createdAt : DataTypes.DATE(3),
    updatedAt : DataTypes.DATE(3),
    deletedAt : DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'milantests',
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  });
  return milantests;
};