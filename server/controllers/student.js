const model = require("../models/student");
const Student = model.Student;

exports.getStudents = async (req, res) => {
  try {
    const doc = await Student.find({}, { password: 0 });
    if (!doc.length) {
      next({
        status: 404,
        message: "Resourse not found",
        extraDetails: "Resourse not found",
      });
    } else {
      res.status(200).json(doc);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStudent = async (req, res, next) => {
  const id = req.params.id;
  try {
    const doc = await Student.findOne({ cmsID: id });
    if (!doc) {
      next({
        status: 404,
        message: "Resourse not found",
        extraDetails: "Resourse not found",
      });
    } else {
      res.status(200).json(doc);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStudentCourses = async (req, res, next) => {
  try {
    const cmsID = req.params.id;
    const student = await Student.findOne({ cmsID }, { courses: 1 }).populate({
      path: "courses",
      select: "-students",
    });

    if (!student) {
      return next({
        status: 404,
        message: "Resourse not found",
        extraDetails: "No student found with id '" + cmsID,
      });
    }

    const courses = student.courses;

    if (!courses.length) {
      return next({
        status: 404,
        message: "Resourse not found",
        extraDetails: "The student is not enrolled in any courses. '" + cmsID,
      });
    }
    res.status(200).json(courses);
  } catch (err) {
    next({});
  }
};
