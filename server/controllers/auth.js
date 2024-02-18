const { Student } = require("../models/student");
const { Admin } = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/private.key"),
  "utf-8"
);
const publicKey = fs.readFileSync(
  path.resolve(__dirname, "../keys/public.key"),
  "utf-8"
);


 
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if the user is a Student
    const student = await Student.findOne({ email });
    if (student) {
      const isAuth = await bcrypt.compare(password, student.password);
      if (isAuth) {
        const token = jwt.sign(
          { email: student.email, role: "student" },
          privateKey,
          { algorithm: "RS256" }
        );
        return res.status(200).json({ token: token, role: "student" });
      }
    }

    // Check if the user is a Admin
    const admin = await Admin.findOne({ email });
    if (admin) {
      const isAuth = await bcrypt.compare(password, admin.password);
      if (isAuth) {
        const token = await jwt.sign(
          { email: admin.email, role: admin.role },
          privateKey,
          { algorithm: "RS256" }
        );
        return res.status(200).json({ token: token, role: admin.role });
      }
    }

    // If neither Student nor Admin, return authentication error
    return next({
      status: 401,
      message: "Fill the fields properly",
      extraDetails: "Invalid email or password",
    });
  } catch (error) {
    next({});
  }
};

exports.registerStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const role = "student";
    const doc = new Student(req.body);

    // const token = jwt.sign(
    //   { email, role },
    //   privateKey,
    //   { algorithm: "RS256" }
    // );
    const bcryptPassword = bcrypt.hashSync(password, 10);

    doc.password = bcryptPassword;
    const student = await doc.save();
    res.status(201).json({ message: "Student is registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      const error = {
        status: 409,
        message: "Fill the input properly",
        extraDetails: "Email or CMS-ID is already taken",
      };
      next(error);
    } else {
      res.status(500).json(err);
    }
  }
};

exports.registerAdmin = async (req, res, next) => {
  try {
    const { email, role, password } = req.body;
    const doc = new Admin(req.body);
    const token = jwt.sign({ email, role }, privateKey, { algorithm: "RS256" });
    const bcryptPassword = bcrypt.hashSync(password, 10);

    doc.password = bcryptPassword;
    const admin = await doc.save();
    res.status(201).json({ token, role });
  } catch (err) {
    if (err.code === 11000) {
      const error = {
        status: 409,
        message: "Fill the input properly",
        extraDetails: "Email ID is already taken",
      };
      next(error);
    } else {
      res.status(500).json(err);
    }
  }
};

const unAuthorized = {
  status: 404,
  message: "You are not allowed to access this page.",
  extraDetails: "You do not have privileges.",
};

exports.identity = async (req, res, next) => {
  try {
      let token = req.headers.authorization;
      if (!token) {
        return next(unAuthorized); // move to error-middleware
      }
  
      token = token.split("Bearer ")[1];
      const auth = jwt.verify(token, publicKey);
      if (auth.role === "admin") {
        const admin = await Admin.findOne({email: auth.email}, {password: 0});
        return res.status(200).json(admin); 
      }
      else if (auth.role === "student") {
          const student = await Student.findOne({email: auth.email}, {password: 0, courses: 0});
          return res.status(200).json(student); 
      }
  
      return next(unAuthorized);
    } catch (error) {
      // console.log(error); 
      next(unAuthorized); // move to error-middleware
    }
}