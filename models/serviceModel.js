// const mongoose = require("mongoose");

// const ServiceSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     slug: {
//       type: String,
//       unique: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     icon: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Service", ServiceSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ServiceSchema = new Schema(
  {
    name: {
      en: { type: String, required: true }, // English name
      ru: { type: String, required: true }, // Russian name
      lv: { type: String, required: true }, // Latvian name
    },
    isActive: {
      type: Boolean,
      default: true, // Service is active by default
    },
    priority: {
      type: Number, // Priority/order of the service
      default: 0, // You can set a default value if needed
    },
    tags: {
      en: [{ type: String }], // English tags
      ru: [{ type: String }], // Russian tags
      lv: [{ type: String }], // Latvian tags
    },
    image: {
      type: String, // URL or file path to the service image
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
