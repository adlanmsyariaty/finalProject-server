const { Transaction, Wallet, Category, sequelize } = require("../models");

class Controller {
  static async fetchWallet(req, res, next) {
    try {
      const id = +req.user.id;
      const wallet = await Wallet.findOne({
        where: {
          UserId: id,
        },
      });

      res.status(200).json({
        data: wallet,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
