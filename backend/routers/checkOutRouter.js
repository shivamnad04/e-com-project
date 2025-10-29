const express = require("express");
const { checkout } = require("../controllers/checkOutController");
const router = express.Router();

router.post("/", checkout);
module.exports = router;
