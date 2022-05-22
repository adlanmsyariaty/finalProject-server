const Consultation = require("../models/Consultation");

class Controller {
  static async createConsultation(req, res) {
    try {
      const consultation = await Consultation.create();

      res.status(201).json({
        data: consultation,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async fetchConsultation(req, res) {
    try {
      const { id } = req.params;
      const consultation = await Consultation.findById(id);
      res.status(200).json(consultation);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateConsultation(req, res) {
    try {
      const { id } = req.params;
      const data = req.body
      const consultation = await Consultation.update(id, data);
      res.status(200).json({
        data: consultation,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
