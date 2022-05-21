const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const { userAuthentication } = require("../middlewares/authentication");
const transactionRouter = require("./transactionRouter");
const walletRouter = require("./walletRouter");
const historyRouter = require("./historyRouter");
const consultantController = require("../controllers/consultantController.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.use(userAuthentication);
router.get("/detail", userController.userDetail);
router.use("/consultants", consultantController.consultantList);
router.use("/histories", historyRouter);
router.use("/transactions", transactionRouter);
router.use("/wallet", walletRouter);

module.exports = router;
