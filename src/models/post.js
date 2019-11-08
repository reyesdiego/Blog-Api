const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true }
  },
  {
    collection: "posts",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

module.exports = mongoose.model("Post", postSchema);
