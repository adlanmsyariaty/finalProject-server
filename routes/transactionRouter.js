const express = require("express");
const Controller = require("../controllers/transactionController");
const router = express.Router();

router.get("/", Controller.fetchTransactions);

router.post("/", Controller.createTransaction);

router.get("/report", Controller.reportTransaction);

router.put("/:id", Controller.editTransaction);

router.delete("/:id", Controller.deleteTransaction);

module.exports = router;
