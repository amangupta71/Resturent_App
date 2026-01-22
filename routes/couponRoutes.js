const express = require("express");
const { createCouponController } = require("../controllers/couponController");
const { jwtAuthMiddleware } = require("../jwt");
const adminmiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post(
  "/create",
  jwtAuthMiddleware,
  adminmiddleware,
  createCouponController
);

module.exports = router;
