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
        email: "adlan@gmail.com",
        password: "12345",
        phoneNumber: "83435783",
        address: "Jalan Hacktiv8 Student Phase 3",
      },
      {
        email: "malik@gmail.com",
        password: "12345",
        phoneNumber: "83435783",
        address: "Jalan Hacktiv8 Student Phase 4",
      },
    ];
    data.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashPassword(el.password);
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  },
};
