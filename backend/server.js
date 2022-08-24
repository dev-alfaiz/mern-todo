// Packages Imports
const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("./database/config");
const jwtKey = "mern-todo-2022";
const User = require("./database/User");
const verifyToken = require("./middlewares/verifyToken");

// ENV Config
dotenv.config({ path: "./.env" });

// App Use
app.use(express.json());
app.use(cors());

// Routes
app.post("/register", async (request, response) => {
  try {
    if (Object.keys(request.body).length) {
      let user = new User(request.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
      jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          response.send({
            result: "Something went wrong, please try after some time.",
          });
        }
        response.send({ result: result, auth: token });
      });
    } else {
      response.status(400).send({ result: "Register details must" });
    }
  } catch (error) {
    response.status(400).send({ result: error });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
