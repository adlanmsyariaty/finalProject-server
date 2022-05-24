const express = require("express");
const Controller = require("../controllers/historyController");
const router = express.Router();

router.get("/", Controller.fetchUserHistories);
router.post("/", Controller.createHistory);
router.get("/:consultantId", Controller.fetchHistory);
router.patch("/", Controller.patchHistory);

module.exports = router;
