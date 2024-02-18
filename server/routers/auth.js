const express = require("express");
const Router = express.Router();
const authControllers = require("../controllers/auth");
const validate = require("../middlewares/validate-middleware");
const studentAuthSchema = require("../validators/student-auth-schema");
const adminAuthSchema = require("../validators/admin-auth-schema");
const adminMiddleware = require("../middlewares/admin-middlware");
 
Router
  .get('/me', authControllers.identity)
  .post("/register/student", adminMiddleware, validate(studentAuthSchema), authControllers.registerStudent)
  .post("/register/admin", adminMiddleware, validate(adminAuthSchema), authControllers.registerAdmin)
  .post("/login", authControllers.login);

exports.Router = Router;