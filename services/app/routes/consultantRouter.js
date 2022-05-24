const express = require("express");
const router = express.Router();
const consultantController = require("../controllers/consultantController.js");
const historyController = require("../controllers/historyController");
const { consultantAuthentication } = require("../middlewares/authentication.js");

router.get("/", consultantController.consultantList);
router.delete("/:id", consultantController.deleteConsultant);
router.post("/login", consultantController.loginConsultant);
router.use(consultantAuthentication)
router.patch("/", consultantController.patchVideoCode);
// router.patch("/status", consultantController.patchVideoCode);
router.get("/histories/close", historyController.fetchConsultantHistoriesClose);

module.exports = router;
