const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const { userAuthentication } = require("../middlewares/authentication");
const transactionRouter = require("./transactionRouter");
const walletRouter = require("./walletRouter");
const consultantRouter = require("./consultantRouter");
const historyRouter = require("./historyRouter");
const consultantController = require("../controllers/consultantController.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.use("/consultants", consultantRouter);
router.use(userAuthentication);
router.use("/consultant-list", consultantController.consultantList);
router.get("/detail", userController.userDetail);
router.use("/histories", historyRouter);
router.use("/transactions", transactionRouter);
router.use("/wallet", walletRouter);

module.exports = router;
