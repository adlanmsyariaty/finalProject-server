const { History, User, Wallet, sequelize } = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async fetchHistories(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id;

      const histories = await History.findAll({
        where: { UserId: id },
        transaction: t,
      });

      await t.commit();
      res.status(200).json({ data: histories });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async fetchHistory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id;

      const { consultantId } = req.params;
      const history = await History.findAll({
        where: { UserId: id, ConsultantId: consultantId },
        transaction: t,
      });

      await t.commit();
      res.status(200).json({ data: history });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async createHistory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id;

      const mongoConsultation = { insertedId: "example_id" };

      const { ConsultantId } = req.body;
      const newHistory = await History.create(
        {
          UserId: id,
          ConsultantId,
          MongoConsultationId: mongoConsultation.insertedId,
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      res.status(201).json(newHistory);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;