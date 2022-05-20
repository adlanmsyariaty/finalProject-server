const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");

router.get("/", categoryController.fetchCategories);

module.exports = router;
