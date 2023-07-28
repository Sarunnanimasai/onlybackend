const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: String,
  todo: String,
  userID: String,
  Id: Number,
});

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = { TodoModel };
