const express = require("express");
const cartRoute = express.Router();
const { cartModel } = require("../models/cartmodel");
const { productModel } = require("../models/productsmodel");

cartRoute.get("/allproducts", async (req, res) => {
  const userID = req.body.userID;
  if (userID) {
    try {
      const allData = await productModel.find({});
      res.send(allData);
    } catch (error) {
      res.send({ msg: "Error occured while fetching all products" });
    }
  } else {
    res.send({ msg: "Please Login to see all the products" });
  }
});

cartRoute.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const cart = await cartModel.find({ userID: userID });
    if (cart[0].userID === userID) {
      res.send(cart);
    } else {
      res.send({ msg: "You are not authorized!" });
    }
  } catch (error) {
    res.send({ msg: "Error getting the data!" });
  }
});

cartRoute.post("/add/:id", async (req, res) => {
  const Id = req.params.id;
  const userID = req.body.userID;
  try {
    const product = await productModel.find({ _id: Id });
    const href = product[0].href;
    const image = product[0].image;
    const title = product[0].title;
    const ratings = product[0].ratings;
    const sprice = product[0].sprice;
    const desc = product[0].desc;

    const cartData = new cartModel({
      userID,
      Id,
      href,
      image,
      title,
      ratings,
      sprice,
      desc,
    });

    await cartData.save();
    res.send({ msg: "Product added to cart!" });
  } catch (error) {
    res.send({ msg: "Error occured adding to cart!" });
  }
});

cartRoute.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const userID = req.body.userID;
  try {
    const cartProduct = await cartModel.find({ _id: Id });
    console.log(cartProduct);
    if (cartProduct[0].userID === userID) {
      await cartModel.findByIdAndDelete(Id);
      res.send({ msg: "Product deleted from cart!" });
    }
  } catch (error) {
    res.send({ msg: "Error occured deleting!" });
  }
});

module.exports = { cartRoute };
