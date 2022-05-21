const express = require("express");
const Controller = require("../controllers/walletController");
const router = express.Router();

router.get("/", Controller.fetchWallet);

// update ticket chat
// router.get("/", Controller)

// update ticket video call
// router.get("/", Controller)

module.exports = router;
