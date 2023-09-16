const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    text: {
      type: "string",
      required: true,
      unique: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);