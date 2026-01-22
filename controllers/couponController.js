// controllers/couponController.js
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");

exports.createCouponController = async (req, res) => {
  try {
    const { code, cartTotal, userId } = req.body;

    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon" });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    if (cartTotal < coupon.minOrderValue) {
      return res.status(400).json({
        message: `Minimum order ₹${coupon.minOrderValue} required`,
      });
    }

    // First order check
    if (coupon.firstorderOnly) {
      const previousOrder = await Order.findOne({ buyer: userId });
      if (previousOrder) {
        return res.status(400).json({
          message: "Coupon valid only for first order",
        });
      }
    }

    let discount = 0;
    if (coupon.discountType === "flat") {
      discount = coupon.discountValue;
    } else {
      discount = Math.floor((cartTotal * coupon.discountValue) / 100);
    }

    res.status(200).json({
      success: true,
      discount,
      finalAmount: cartTotal - discount,
      couponCode: coupon.code,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Coupon apply failed" });
  }
};



