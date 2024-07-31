const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
      unique: true, // Ensure each value is unique
    },
    name: {
      en: { type: String, required: true },
      ru: { type: String, required: true },
      lv: { type: String, required: true },
    },
    slug: {
      type: String,
      unique: true, // URL-friendly identifier
    },
    description: {
      en: { type: String, required: true },
      ru: { type: String, required: true },
      lv: { type: String, required: true },
    },
    tags: {
      en: [{ type: String }],
      ru: [{ type: String }],
      lv: [{ type: String }],
    },
    image: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCategory", ServiceCategorySchema);
