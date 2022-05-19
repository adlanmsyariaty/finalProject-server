const { Transaction, Wallet, Category, sequelize } = require("../models");

class Controller {
  static async fetchTransactions(req, res, next) {
    try {
      const id = +req.user.id

      const walletData = await Wallet.findOne({
        where: {
          id
        }
      })
      const transactions = await Transaction.findAll({
        where: {
          WalletId: walletData.id,
        },
        include: [{ model: Category, attributes: ["name", "type"] }],
      });

      res.status(200).json({
        data: transactions,
      });
    } catch (err) {
      next(err)
    }
  }

  static async createTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { amount, imageReceipt, transactionDate, WalletId, CategoryId } =
        req.body;
      const id = +req.user.id

      const walletData = await Wallet.findOne({
        where: {
          id
        },
        transaction: t,
      })

      const data = {
        amount: +amount,
        transactionDate,
        imageReceipt,
        WalletId: walletData.id ,
        CategoryId,
      };

      const transaction = await Transaction.create(data, {
        transaction: t,
      });

      const checkCategory = await Category.findByPk(CategoryId, {
        transaction: t,
      });

      const wallet = await Wallet.findByPk(walletData.id, { transaction: t });

      let data2 = {
        totalMoney: wallet.totalMoney,
      };

      if (
        checkCategory.name === "Income" ||
        checkCategory.type === "Debt Collection" ||
        checkCategory.type === "Debt"
      ) {
        data2.totalMoney += transaction.amount;
      } else if (
        checkCategory.name === "Expense" ||
        checkCategory.type === "Loan" ||
        checkCategory.type === "Repayment"
      ) {
        data2.totalMoney -= transaction.amount;
      }

      await Wallet.update(data2, {
        where: { id: walletData.id },
        transaction: t,
      });

      await t.commit();

      res.status(201).json({
        data: transaction,
      });
    } catch (err) {
      await t.rollback();
      next(err)
    }
  }

  static async editTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const userId = +req.user.id
      const walletData = await Wallet.findOne({
        where: {
          id: userId
        }
      })
      const { amount, imageReceipt, transactionDate, WalletId, CategoryId } =
        req.body;

      const data = {
        amount,
        transactionDate,
        imageReceipt,
        WalletId: walletData.id,
        CategoryId,
      };

      const oldTransaction = await Transaction.findByPk(id, {
        include: [{ model: Category, attributes: ["name", "type"] }],
      });

      await Transaction.update(
        data,
        { where: { id } },
        {
          transaction: t,
        }
      );

      const NewTransaction = await Transaction.findByPk(id);

      const checkCategory = await Category.findByPk(CategoryId, {
        transaction: t,
      });

      const wallet = await Wallet.findByPk(walletData.id, { transaction: t });

      let data2 = {
        totalMoney: wallet.totalMoney,
      };

      if (
        oldTransaction.Category.name === "Income" ||
        oldTransaction.Category.type === "Debt Collection" ||
        oldTransaction.Category.type === "Debt"
      ) {
        if (
          checkCategory.name === "Income" ||
          checkCategory.type === "Debt Collection" ||
          checkCategory.type === "Debt"
        ) {
          data2.totalMoney =
            data2.totalMoney - oldTransaction.amount + NewTransaction.amount;
        } else {
          data2.totalMoney =
            data2.totalMoney - oldTransaction.amount - NewTransaction.amount;
        }
      } else if (
        oldTransaction.Category.name === "Expense" ||
        oldTransaction.Category.type === "Loan" ||
        oldTransaction.Category.type === "Repayment"
      ) {
        if (
          checkCategory.name === "Income" ||
          checkCategory.type === "Debt Collection" ||
          checkCategory.type === "Debt"
        ) {
          data2.totalMoney =
            data2.totalMoney + oldTransaction.amount + NewTransaction.amount;
        } else {
          data2.totalMoney =
            data2.totalMoney + oldTransaction.amount - NewTransaction.amount;
        }
      }

      await Wallet.update(data2, {
        where: { id: walletData.id },
        transaction: t,
      });

      await t.commit();

      res.status(201).json({
        data: NewTransaction,
      });
    } catch (err) {
      await t.rollback();
      next(err)
    }
  }

  static async deleteTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      const transaction = await Transaction.findByPk(id, {
        include: [{ model: Category, attributes: ["name", "type"] }],
      });

      const wallet = await Wallet.findByPk(transaction.WalletId, {
        transaction: t,
      });

      let data2 = {
        totalMoney: wallet.totalMoney,
      };

      const test = await Transaction.destroy({ where: { id }, transaction: t });

      if (
        transaction.Category.name === "Income" ||
        transaction.Category.type === "Debt Collection" ||
        transaction.Category.type === "Debt"
      ) {
        data2.totalMoney -= transaction.amount;
      } else if (
        transaction.Category.name === "Expense" ||
        transaction.Category.type === "Loan" ||
        transaction.Category.type === "Repayment"
      ) {
        data2.totalMoney += transaction.amount;
      }

      await Wallet.update(data2, {
        where: { id: transaction.WalletId },
        transaction: t,
      });

      await t.commit();

      res.status(201).json({
        data: transaction,
      });
    } catch (err) {
      await t.rollback();
      next(err)
    }
  }

  static async reportTransaction(req, res, next) {
    try {
      const id = +req.user.id
      const walletData = await Wallet.findOne({
        where: {
          id
        }
      })
      const transactions = await Transaction.findAll({
        include: [{ model: Category, attributes: ["name", "type"] }],
        where: { WalletId: walletData.id },
      });

      const date = new Date();
      const thisMonth = date.getMonth() + 1;
      const thisYear = date.getFullYear();

      let monthlyTransactions = [];
      let totalIncome = 0;
      let totalNeeds = 0;
      let totalWants = 0;

      transactions.forEach((el) => {
        const date = el.transactionDate;

        if (
          el.Category.name === "Income" ||
          el.Category.type === "Debt Collection" ||
          el.Category.type === "Debt"
        ) {
          totalIncome += el.amount;
        } else if (
          el.Category.type === "Food & Baverage" ||
          el.Category.type === "Transportation" ||
          el.Category.type === "Rentals" ||
          el.Category.type === "Water Bill" ||
          el.Category.type === "Phone Bill" ||
          el.Category.type === "Electricity Bill" ||
          el.Category.type === "Gas Bill" ||
          el.Category.type === "Television Bill" ||
          el.Category.type === "Internet Bill" ||
          el.Category.type === "Other Utility Bills" ||
          el.Category.type === "Home Maintenance" ||
          el.Category.type === "Vehicle Maintenance" ||
          el.Category.type === "Medical Check Up" ||
          el.Category.type === "Insurances" ||
          el.Category.type === "Education"
        ) {
          totalNeeds += el.amount;
        } else if (
          el.Category.type === "Houseware" ||
          el.Category.type === "Personal Items" ||
          el.Category.type === "Pets" ||
          el.Category.type === "Home Services" ||
          el.Category.type === "Other Expense" ||
          el.Category.type === "Fitness" ||
          el.Category.type === "Makeup" ||
          el.Category.type === "Gifts & Donations" ||
          el.Category.type === "Streaming Services" ||
          el.Category.type === "Other Utility Bills" ||
          el.Category.type === "Home Maintenance" ||
          el.Category.type === "Fun Money" ||
          el.Category.type === "Pay Interest" ||
          el.Category.type === "Outgoing Transfer"
        ) {
          totalWants += el.amount;
        }

        if (
          date.getMonth() + 1 === thisMonth &&
          date.getFullYear() === thisYear
        ) {
          monthlyTransactions.push(el);
        }
      });

      let totalSaving = totalIncome - (totalWants + totalNeeds);
      let totalExpenses = totalNeeds + totalWants;

      totalNeeds = (totalNeeds / totalIncome) * 100;
      totalWants = (totalWants / totalIncome) * 100;
      totalSaving = (totalSaving / totalIncome) * 100;
      totalExpenses = (totalExpenses / totalIncome) * 100;

      let moneyStatus = "";

      if (totalNeeds <= 50 && totalWants <= 30) {
        moneyStatus = "save";
      } else if (totalExpenses >= 100) {
        moneyStatus = "danger";
      } else {
        moneyStatus = "warning";
      }

      res.status(200).json({
        data: monthlyTransactions,
        moneyStatus,
      });
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller;
