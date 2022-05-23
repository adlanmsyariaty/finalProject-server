'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
      History.belongsTo(models.User, {
        foreignKey: 'ConsultantId'
      })
    }
  }
  History.init({
    UserId: DataTypes.INTEGER,
    ConsultantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Invalid consultant id"
        },
        notEmpty: {
          msg: "Invalid consultant id"
        }
      }
    },
    MongoConsultationId: DataTypes.STRING,
    consultationStatus: DataTypes.STRING,
    consultationType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};