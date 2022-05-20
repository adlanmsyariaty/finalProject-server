const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const { userAuthentication } = require("../middlewares/authentication");
const transactionRouter = require("./transactionRouter");
const walletRouter = require("./walletRouter");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.use(userAuthentication);

router.use("/transactions", transactionRouter);
router.use("/wallet", walletRouter);

module.exports = router;
