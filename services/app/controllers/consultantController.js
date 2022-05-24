const { User, sequelize } = require("../models");
const { Op } = require("sequelize");
const { comparePasswordWithHash } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

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

  static async patchConsultantStatus(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.params.id
      let consultant = await User.findOne({
        where: {
          [Op.and]: [{ id: id }, { role: "consultant" }],
        },
        transaction: t
      })

      if (!consultant) throw { name: "CONSULTANT_NOT_FOUND" };

      await User.update(
        {
          status: !consultant.status
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
      res.status(200).json(consultant);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async patchStatus(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id
      let consultant = await User.findOne({
        where: {
          [Op.and]: [{ id: id }, { role: "consultant" }],
        },
        transaction: t
      })

      if (!consultant) throw { name: "CONSULTANT_NOT_FOUND" };

      await User.update(
        {
          status: true
        },
        {
          where: {
            id
          },
          returning: true,
          transaction: t,
        }
      );

      let newConsultant = await User.findOne({
        where: {
          [Op.and]: [{ id: id }, { role: "consultant" }],
        },
        transaction: t
      })

      await t.commit();
      res.status(200).json(newConsultant);
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

      await User.destroy({
        where: {
          id,
        },
        transaction: t,
      });

      await t.commit();
      res.status(200).json(consultant);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async loginConsultant(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EMAIL_IS_REQUIRED" };
      if (!password) throw { name: "PASSWORD_IS_REQUIRED" };

      const selectedUser = await User.findOne({
        where: {
          [Op.and]: [{ email: email }, { role: "consultant" }],
        },
        transaction: t,
      });
      if (!selectedUser) {
        throw { name: "USER_NOT_FOUND" };
      }
      const passwordCheck = comparePasswordWithHash(
        password,
        selectedUser.password
      );
      if (!passwordCheck) {
        throw { name: "USER_NOT_FOUND" };
      }
      const payload = {
        id: selectedUser.id,
        email: selectedUser.email,
      };

      const token = tokenGenerator(payload);
      await t.commit();
      res.status(200).json({
        access_token: token,
        user: selectedUser,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async patchVideoCode(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id;
      const { videoCode } = req.body;

      let patchedConsultant = await User.update(
        {
          videoCode,
        },
        {
          where: {
            [Op.and]: [{ id: id }, { role: "consultant" }],
          },
          returning: true,
          transaction: t,
        }
      );

      if (!patchedConsultant) throw { name: "CONSULTANT_NOT_FOUND" };

      await t.commit();
      res.status(200).json(patchedConsultant[1][0]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = ConsultantController;
