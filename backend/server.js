// Packages Imports
const express = require("express");
const app = require("./app");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("./database/config");
const jwtKey = "mern-todo-2022";
const User = require("./database/User");
const Todo = require("./database/Todo");
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
    response.status(500).send({ error: error.message });
  }
});

app.post("/login", async (request, response) => {
  try {
    if (request.body.email && request.body.password) {
      let user = await User.findOne(request.body).select("-password");
      if (user) {
        jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
          if (error) {
            response.status(400).send({
              result: "Something went wrong, please try after some time.",
            });
          }
          response.send({ result: user, auth: token });
        });
      } else {
        response.status(404).send({ result: "No user found." });
      }
    } else {
      response.status(404).send({ result: "No user found." });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.post("/add-todo", verifyToken, async (request, response) => {
  try {
    if (request.body.title && request.body.body && request.body.userId) {
      let todo = new Todo(request.body);
      let result = await todo.save();
      response.send(result);
    } else {
      response.status(400).send({ result: "Valid Todo Details Must." });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.get("/todos/:id", verifyToken, async (request, response) => {
  try {
    if (request.params.id) {
      let todos = await Todo.find({ userId: request.params.id });
      if (todos.length > 0) {
        response.send({ result: todos });
      } else {
        response.send({ result: "No Todos Found" });
      }
    } else {
      response.send({ result: "No Todos Found" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.delete("/delete-todo/:id", verifyToken, async (request, response) => {
  try {
    if (request.params.id) {
      let result = await Todo.deleteOne({ _id: request.params.id });
      if (result.acknowledged && result.deletedCount === 1) {
        response.send("Todo Deleted Successfully!");
      } else {
        response.send({ result: "No Product Deleted with this ID" });
      }
    } else {
      response.send({ result: "No Product Deleted with this ID" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
