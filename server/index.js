require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/error-middleware");
// const adminMiddleware = require("./middlewares/admin-middlware");
const userMiddleWare = require("./middlewares/user-middleware");
const studentRouter = require("./routers/student");
const courseRouter = require("./routers/course");
const adminRouter = require("./routers/admin");
const authRouter = require("./routers/auth");
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter.Router);
// server.use("/api/admins", adminMiddleware, adminRouter.Router);
server.use("/api/students", userMiddleWare, studentRouter.Router);
server.use("/api/courses", userMiddleWare, courseRouter.Router);


// for frontend
server.use(express.static("public"));
server.use("/*", express.static("public"));

server.use(errorMiddleware);
server.listen(process.env.PORT, () => {
  console.log(`Server is started at port: ${process.env.PORT}`);
});
