const express = require("express");
const Router = express.Router();
const courseController = require("../controllers/course");
const adminMiddleware = require("../middlewares/admin-middlware");
const studentMiddleware = require("../middlewares/student-middleware");

Router.get("/", courseController.getCourses)
.get("/:id", adminMiddleware, courseController.getCourseStudents)
.post("/", adminMiddleware, courseController.createCourse)
.post("/enroll", studentMiddleware, courseController.enrollCourse)
.post("/drop", studentMiddleware, courseController.dropCourse);

exports.Router = Router;