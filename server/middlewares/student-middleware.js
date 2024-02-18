const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/public.key"),
  "utf-8"
);

const unAuthorized = {
  status: 404,
  message: "You are not allowed to access this page.",
  extraDetails: "You do not have privileges.",
};

studentMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return next(unAuthorized); // move to error-middleware
    }

    token = token.split("Bearer ")[1];
    const isAuth = jwt.verify(token, publicKey);
    if (isAuth.email && isAuth.role == "student") {
      return next(); // move to the requested path
    }

    return next(unAuthorized);
  } catch (error) {
    // console.log(error); 
    next(unAuthorized); // move to error-middleware
  }
};

module.exports = studentMiddleware;
