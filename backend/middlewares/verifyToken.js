const jwt = require("jsonwebtoken");
const jwtKey = "mern-todo-2022";

const verifyToken = (request, response, next) => {
  let token = request.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (error, valid) => {
      if (error) {
        response.status(401).send({ result: "Please provide a valid token" });
      } else {
        next();
      }
    });
  } else {
    response.status(403).send({ result: "Please add token with headers." });
  }
};

module.exports = verifyToken;
