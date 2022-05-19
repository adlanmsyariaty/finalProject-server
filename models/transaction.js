'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Wallet)
      Transaction.belongsTo(models.Category)
    }
  }
  Transaction.init({
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "amount is required" },
        notNull: { msg: "amount is required" },
        min: {
          args: [0],
          msg: "Amount should be more than equal 0"
        }
      },
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "date is required" },
        notNull: { msg: "date is required" },
      },
    },
    imageReceipt: { type: DataTypes.STRING },
    WalletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "wallet is required" },
        notNull: { msg: "wallet is required" },
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "category is required" },
        notNull: { msg: "category is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};