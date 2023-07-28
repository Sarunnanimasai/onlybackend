const express = require("express");
const { userRoute } = require("./routes/userroute");
const { connection } = require("./main");
const { todoRoute } = require("./routes/todoroute");
const cors = require("cors");
const { Auth } = require("./middlewares/middleware");
const { cartRoute } = require("./routes/cartroute");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", userRoute);

app.use(Auth);

app.use("/todos", todoRoute);

app.use("/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello world Sama!");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Server is running");
  } catch (error) {
    console.log("Error occured while connecting!");
  }
});
