const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  href: String,
  href2: String,
  image: String,
  href3: String,
  title: String,
  apopovertriggerhref: String,
  ratings: String,
  asizebase: String,
  sprice: String,
  apricewhole: String,
  asizebase2: String,
  fullprice: String,
  arow: String,
  atruncatefull: String,
  desc: String,
});

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
