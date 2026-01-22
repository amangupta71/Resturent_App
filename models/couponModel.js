const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    discountType: {
      type: String,
      enum: ["percent", "flat"],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
    },

    minOrderValue: {
      type: Number,
      default: 0,
    },

    maxDiscount: {
      type: Number, // useful for percent coupons
    },

    firstOrderOnly: {
      type: Boolean,
      default: false,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    usedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
