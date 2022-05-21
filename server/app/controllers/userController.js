const { User, Wallet, sequelize } = require("../models");
const { comparePasswordWithHash } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");
const { Op } = require("sequelize");

class UserController {
  static async registerUser(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, username, email, password } = req.body;
      const newUser = await User.create(
        {
          name,
          username,
          email,
          password,
          role: "user",
        },
        {
          transaction: t,
        }
      );

      const newWallet = await Wallet.create(
        {
          UserId: newUser.id,
        },
        {
          transaction: t,
        }
      );

      await t.commit();
      res.status(201).json(newUser);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EMAIL_IS_REQUIRED" };
      if (!password) throw { name: "PASSWORD_IS_REQUIRED" };

      const selectedUser = await User.findOne({
        where: {
          [Op.and]: [{ email: email }, { role: "user" }],
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

  static async userDetail(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const id = +req.user.id

      const user = await User.findOne({
        where: {
          id
        },
        transaction: t
      })

      await t.commit();
      res.status(200).json(user);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

module.exports = UserController;
