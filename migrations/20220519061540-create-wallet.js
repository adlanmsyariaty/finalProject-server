"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wallets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalMoney: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalIncome: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalExpense: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      membership: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wallets");
  },
};
