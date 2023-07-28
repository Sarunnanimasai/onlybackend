const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: String,
  Id: String,
  href: String,
  image: String,
  title: String,
  ratings: String,
  sprice: String,
  desc: String,
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };
