'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.User)
      Wallet.hasMany(models.Transaction)
    }
  }
  Wallet.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalMoney: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalIncome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalExpense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    membership: {
      type: DataTypes.INTEGER,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};