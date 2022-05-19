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
        name: "Debt/Loan",
        type: "Debt Collection",
        icon: "https://static.moneylover.me/img/icon/icon_140.png"
      },
      {
        name: "Debt/Loan",
        type: "Debt",
        icon: "https://static.moneylover.me/img/icon/ic_category_debt.png"
      },
      {
        name: "Debt/Loan",
        type: "Loan",
        icon: "https://static.moneylover.me/img/icon/ic_category_loan.png"
      },
      {
        name: "Debt/Loan",
        type: "Repayment",
        icon: "https://static.moneylover.me/img/icon/icon_141.png"
      },
      {
        name: "Income",
        type: "Collect Interest",
        icon: "https://static.moneylover.me/img/icon/icon_118.png"
      },
      {
        name: "Income",
        type: "Salary",
        icon: "https://static.moneylover.me/img/icon/ic_category_salary.png"
      },
      {
        name: "Income",
        type: "Other Income",
        icon: "https://static.moneylover.me/img/icon/ic_category_other_income.png"
      },
      {
        name: "Income",
        type: "Incoming Transfer",
        icon: "https://static.moneylover.me/img/icon/icon_143.png"
      },
      {
        name: "Expense",
        type: "Food & Beverage",
        icon: "https://static.moneylover.me/img/icon/ic_category_foodndrink.png"
      },
      {
        name: "Expense",
        type: "Transportation",
        icon: "https://static.moneylover.me/img/icon/ic_category_transport.png"
      },
      {
        name: "Expense",
        type: "Rentals",
        icon: "https://static.moneylover.me/img/icon/icon_136.png"
      },
      {
        name: "Expense",
        type: "Water Bill",
        icon: "https://static.moneylover.me/img/icon/icon_124.png"
      },
      {
        name: "Expense",
        type: "Phone Bill",
        icon: "https://static.moneylover.me/img/icon/icon_134.png"
      },
      {
        name: "Expense",
        type: "Electricity Bill",
        icon: "https://static.moneylover.me/img/icon/icon_125.png"
      },
      {
        name: "Expense",
        type: "Gas Bill",
        icon: "https://static.moneylover.me/img/icon/icon_139.png"
      },
      {
        name: "Expense",
        type: "Television Bill",
        icon: "https://static.moneylover.me/img/icon/icon_84.png"
      },
      {
        name: "Expense",
        type: "Internet Bill",
        icon: "https://static.moneylover.me/img/icon/icon_126.png"
      },
      {
        name: "Expense",
        type: "Other Utility Bills",
        icon: "https://static.moneylover.me/img/icon/icon_138.png"
      },
      {
        name: "Expense",
        type: "Home Maintenance",
        icon: "https://static.moneylover.me/img/icon/icon_29.png"
      },
      {
        name: "Expense",
        type: "Vehicle Maintenance",
        icon: "https://static.moneylover.me/img/icon/icon_130.png"
      },
      {
        name: "Expense",
        type: "Medical Check Up",
        icon: "https://static.moneylover.me/img/icon/ic_category_doctor.png"
      },
      {
        name: "Expense",
        type: "Insurances",
        icon: "https://static.moneylover.me/img/icon/icon_137.png"
      },
      {
        name: "Expense",
        type: "Education",
        icon: "https://static.moneylover.me/img/icon/ic_category_education.png"
      },
      {
        name: "Expense",
        type: "Houseware",
        icon: "https://static.moneylover.me/img/icon/icon_107.png"
      },
      {
        name: "Expense",
        type: "Personal Items",
        icon: "https://static.moneylover.me/img/icon/icon_41.png"
      },
      {
        name: "Expense",
        type: "Pets",
        icon: "https://static.moneylover.me/img/icon/icon_53.png"
      },
      {
        name: "Expense",
        type: "Home Services",
        icon: "https://static.moneylover.me/img/icon/icon_8.png"
      },
      {
        name: "Expense",
        type: "Other Expense",
        icon: "https://static.moneylover.me/img/icon/ic_category_other_expense.png"
      },
      {
        name: "Expense",
        type: "Fitness",
        icon: "https://static.moneylover.me/img/icon/icon_70.png"
      },
      {
        name: "Expense",
        type: "Makeup",
        icon: "https://static.moneylover.me/img/icon/icon_63.png"
      },
      {
        name: "Expense",
        type: "Gifts & Donations",
        icon: "https://static.moneylover.me/img/icon/ic_category_donations.png"
      },
      {
        name: "Expense",
        type: "Streaming Services",
        icon: "https://static.moneylover.me/img/icon/icon_94.png"
      },
      {
        name: "Expense",
        type: "Fun Money",
        icon: "https://static.moneylover.me/img/icon/icon_49.png"
      },
      {
        name: "Expense",
        type: "Investment",
        icon: "https://static.moneylover.me/img/icon/ic_category_invest.png"
      },
      {
        name: "Expense",
        type: "Pay Interest",
        icon: "https://static.moneylover.me/img/icon/icon_4.png"
      },
      {
        name: "Expense",
        type: "Outgoing Transfer",
        icon: "https://static.moneylover.me/img/icon/icon_142.png"
      },
    ]

    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Categories", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
