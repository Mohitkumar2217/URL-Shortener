// models/url.js
const mongoose = require("mongoose");

// Basic URL validator
function isValidUrl(val) {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
}

const urlSchema = new mongoose.Schema(
  {
    shortId: { type: String, required: true, unique: true, trim: true },
    redirectId: {
      type: String,
      required: true,
      validate: {
        validator: isValidUrl,
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    visitHistory: [
      {
        timestamp: { type: Number, default: () => Date.now() },
        ip: { type: String },
        userAgent: { type: String },
        referrer: { type: String },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
