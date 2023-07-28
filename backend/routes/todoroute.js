const express = require("express");
const todoRoute = express.Router();
const { TodoModel } = require("../models/todomodel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

todoRoute.get("/", async (req, res) => {
  const userId = req.body.userID;
  if (userId) {
    const allTodos = await TodoModel.find({});
    res.send(allTodos);
  } else {
    res.send({ msg: "Login to see all todos!" });
  }
});

todoRoute.post("/create", async (req, res) => {
  const todo = req.body;
  try {
    const newTodo = new TodoModel(todo);
    await newTodo.save();
    res.send({ msg: "Added todo seuccesfully!" });
  } catch (error) {
    res.send(error);
  }
});

todoRoute.get("/mytodos", async (req, res) => {
  const userId = req.body.userID;
  console.log(userId);
  try {
    const userTodo = await TodoModel.find({ userID: userId });
    res.send(userTodo);
  } catch (error) {
    res.send({ msg: "error occured getting the todos, try again" });
  }
});

todoRoute.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const data = req.body;
  const userID = req.body.userID;
  try {
    const findTodo = await TodoModel.find({ _id: Id });
    console.log(findTodo[0]);
    if (findTodo[0].userID === userID) {
      await TodoModel.findByIdAndUpdate(Id, data);
      res.send({ msg: "Updated Todo!" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

todoRoute.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const userID = req.body.userID;
  try {
    const findTodo = await TodoModel.find({ _id: Id });
    if (findTodo[0].userID === userID) {
      await TodoModel.findByIdAndDelete(Id);
      res.send({ msg: "Successully deleted" });
    } else {
      res.send({ msg: "You are not authorized" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = { todoRoute };
