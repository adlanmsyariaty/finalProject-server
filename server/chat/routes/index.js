const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.post("/", Controller.createConsultation);
router.get("/:id", Controller.fetchConsultation);
router.put("/:id", Controller.updateConsultation);

module.exports = router;
