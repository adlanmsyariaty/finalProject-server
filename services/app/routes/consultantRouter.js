const express = require("express");
const router = express.Router();
const consultantController = require("../controllers/consultantController.js");
const { consultantAuthentication } = require("../middlewares/authentication.js");

router.get("/", consultantController.consultantList);
router.delete("/:id", consultantController.deleteConsultant);
router.post("/login", consultantController.loginConsultant);
router.use(consultantAuthentication)
router.patch("/", consultantController.patchVideoCode);

module.exports = router;
