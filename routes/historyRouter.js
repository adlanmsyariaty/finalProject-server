const express = require("express");
const Controller = require("../controllers/historyController");
const router = express.Router();

router.get("/", Controller.fetchHistories);
router.post("/", Controller.createHistory);
router.get("/:consultantId", Controller.fetchHistory);


module.exports = router;
