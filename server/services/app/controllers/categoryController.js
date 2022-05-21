const { Category } = require("../models");

class Controller {
  static async fetchCategories(req, res, next) {
    try {
      const categories = await Category.findAll();

      let incomeCategories = [];
      let expenseCategories = [];

      categories.forEach((category) => {
        if (category.name === "Income") {
          incomeCategories.push(category);
        } else if (category.name === "Expense") {
          expenseCategories.push(category);
        }
      });

      res.status(200).json({
        data: {
          incomeCategories,
          expenseCategories,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;