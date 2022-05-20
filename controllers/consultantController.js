const { User, sequelize } = require("../models");
const { Op } = require("sequelize");

class ConsultantController {
  static async consultantList(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const consultants = await User.findAll({
        where: {
          role: "consultant",
        },
        transaction: t,
      });
      await t.commit();
      res.status(200).json(consultants);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async deleteConsultant(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.params.id;
      const consultant = await User.findOne({
        where: {
          [Op.and]: [{ id: id }, { role: "consultant" }],
        },
        transaction: t,
      });

      if (!consultant) throw { name: "CONSULTANT_NOT_FOUND" };

      await User.destroy(
        {
          where: {
            id,
          },
          transaction: t,
        }
      );

      await t.commit();
      res.status(200).json(consultant);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = ConsultantController;
