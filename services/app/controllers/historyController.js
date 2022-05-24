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
        transaction: t,
      });

      let messages = []
      for (let i = 0; i < histories.length; i++) {
        const response = await axios.get(`https://m-cure-mongo.herokuapp.com/consultation/${histories[i].MongoConsultationId}`)
        messages.push(response.data.messages)
      }

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
      res.status(200).json({ data: histories, messages, details });
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

  static async fetchConsultantHistoriesOpen(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id;

      const histories = await History.findAll({
        where: {
          [Op.and]: [{ ConsultantId: id }, { consultationStatus: "open" }],
        },
        include: [User],
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
      let id;
      if (req.user.id) {
        id = +req.user.id;
      } else {
        id = +req.params.id;
      }

      const pacthedStatus = await History.update(
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

      await t.commit();
      res.status(201).json(pacthedStatus[1][0]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = Controller;