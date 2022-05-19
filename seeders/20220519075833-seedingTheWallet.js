"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = [
      {
        UserId: 2,
        totalMoney: 10000000,
        totalIncome: 2000000,
        totalExpense: 1000000
      },
      {
        UserId: 3,
        totalMoney: 10000000,
        totalIncome: 2000000,
        totalExpense: 1000000,
        membership: true
      }
    ]
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Wallets", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Wallets", null, {});
  },
};
