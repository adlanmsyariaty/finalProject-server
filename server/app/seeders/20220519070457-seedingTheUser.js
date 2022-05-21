"use strict";
const { hashPassword } = require('../helpers/bcrypt')
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
        name: "adlan",
        username: "adlanmalik",
        email: "adlan@mail.com",
        password: "12345",
        role: "admin"
      },
      {
        name: "andrew",
        username: "andrewjaneananto",
        email: "andrewjaneananto@mail.com",
        password: "12345",
        role: "user"
      },
      {
        name: "ratih",
        username: "ratihsanjaya",
        email: "ratihsanjaya@mail.com",
        password: "12345",
        role: "user"
      },
      {
        name: "debby",
        username: "debbyria",
        email: "debbyria@mail.com",
        password: "12345",
        role: "consultant"
      },
      {
        name: "zakiy",
        username: "zakiynurhasyim",
        email: "zakiynurhasyim@mail.com",
        password: "12345",
        role: "consultant"
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
