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
      defaultValue: 0
    },
    ticketChat: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ticketVideo: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};