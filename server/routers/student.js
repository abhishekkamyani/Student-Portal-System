const express = require("express");
const Router = express.Router();
const studentControllers = require("../controllers/student");
const studentMiddleware = require("../middlewares/student-middleware");
const adminMiddleware = require("../middlewares/admin-middlware");

Router.get("/", adminMiddleware, studentControllers.getStudents)
  .get("/:id", adminMiddleware, studentControllers.getStudent)
  .get("/courses/:id", studentMiddleware, studentControllers.getStudentCourses);

exports.Router = Router;
 