const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/public.key"),
  "utf-8"
);

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const isAuth = jwt.verify(token, publicKey);

    if (isAuth.email && isAuth.role === "admin") {
      return next();
    }

    return next({
      status: 401,
      message: "Unauthrized access",
      extraDetails: "You don't have privileges",
    });
  } catch (error) {
    // console.log(error);
    return next({
      status: 401,
      message: "Unauthrized access",
      extraDetails: "You don't have privileges",
    });
  }
};

module.exports = adminMiddleware;
