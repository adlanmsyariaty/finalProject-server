const { History, User, Wallet, sequelize } = require("../models");
const { Op } = require("sequelize");
const axios = require('axios')

class Controller {
  static async fetchUserHistories(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id;

      const histories = await History.findAll({
        where: {
          [Op.and]: [{ UserId: id }, { consultationStatus: "close" }],
        },
        order: [["createdAt", "DESC"]],
        transaction: t,
      });

      let details = []
      for (let j = 0; j < histories.length; j++) {
        const consultant = await User.findOne({
          where: {
            id: histories[j].ConsultantId
          },
          transaction: t,
        })
        details.push(consultant)
      }

      await t.commit();
      res.status(200).json({ data: histories, details });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async fetchConsultantHistoriesClose(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id;

      const histories = await History.findAll({
        where: {
          [Op.and]: [{ ConsultantId: id }, { consultationStatus: "close" }],
        },
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
      const { consultationType, ConsultantId } = req.body

      const response = await axios.post("https://m-cure-mongo.herokuapp.com/consultation/")
      const mongoConsultation = { insertedId: response.data.data.insertedId};

      const newHistory = await History.create(
        {
          UserId: id,
          ConsultantId,
          MongoConsultationId: mongoConsultation.insertedId,
          consultationStatus: "open",
          consultationType
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

  static async patchHistory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.params.id

      const patchedStatus = await History.update(
        {
          consultationStatus: "close",
        },
        {
          where: {
            id
          },
          returning: true,
          transaction: t,
        }
      );

      const wallet = await Wallet.findOne({
        where: {
          UserId: patchedStatus[1][0].UserId
        },
        transaction: t,
      })

      const newUpdatedWallet = await Wallet.update(
        {
          ticketVideo: wallet.ticketVideo - 1
        },
        {
          where: {
            id: wallet.id
          },
          returning: true,
          transaction: t,
        }
      )

      await t.commit();
      res.status(200).json(newUpdatedWallet[1][0]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;