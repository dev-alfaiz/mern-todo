const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    userId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("todos", todoSchema);
