const { getDB } = require("../config/connection");
const { ObjectId } = require("mongodb");

class Consultation {
  static consultation() {
    const database = getDB();
    return database.collection("MongoConsultations");
  }

  static async create() {
    try {
      const consultation = await this.consultation().insertOne({
        messages: [],
        type: "chat",
      });
      return consultation;
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(_id) {
    try {
      _id = ObjectId(_id);
      const consultation = await this.consultation().findOne({ _id });
      return consultation;
    } catch (err) {
      throw err;
    }
  }

  static async update(_id, data) {
    try {
      _id = ObjectId(_id);
      const user = await this.consultation().updateOne(
        { _id },
        {
          $push: {
            messages: {
              name: data.name,
              text: data.text,
              date: data.date,
            },
          },
        }
      );
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Consultation;
