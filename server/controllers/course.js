const { Course } = require("../models/course");
const { Student } = require("../models/student");

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}, { students: 0 });
    if (courses.length) {
      return res.status(200).json(courses);
    }
    return next({
      status: 404,
      message: "Resources not found",
      extraDetails: "Courses not found",
    });
  } catch (err) {
    next({});
  }
};

exports.getCourseStudents = async (req, res, next) => {
  try {
    const id = req.params.id;
    const course = await Course.findOne({ courseID: id }).populate({
      path: "students",
      select: "-password -courses",
    });
    if (course) {
      return res.status(200).json(course);
    }
    return next({
      status: 404,
      message: "Resources not found",
      extraDetails: `No course found with provided courseID: ${id}`,
    });
  } catch (err) {
    // console.log(err);
    next({});
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const doc = new Course(req.body);
    const course = await doc.save();
    res.status(201).json(course);
  } catch (err) {
    if (err.code === 11000) {
      return next({
        status: 409,
        message: "Fill the input properly",
        extraDetails: "Course ID is already taken",
      });
    }
    next({
      status: 422,
      message: "Fill the input properly",
      extraDetails: err.message,
    });
  }
};

exports.enrollCourse = async (req, res, next) => {
  try {
    const { courseID, cmsID } = req.body;
    const student = await Student.findOne({ cmsID }, { password: 0 });
    if (!student) {
      return next({
        status: 404,
        message: "Resource not found",
        extraDetails: `No student found with provided cmsID: ${cmsID}`,
      });
    }

    const course = await Course.findOne({ courseID });
    if (!course) {
      return next({
        status: 404,
        message: "Resource not found",
        extraDetails: `No course found with provided courseID: ${courseID}`,
      });
    }

    if (student.courses.includes(course._id)) {
      return next({
        status: 409,
        message: "Conflict",
        extraDetails: "The student is already enrolled in the course",
      });
    }

    student.courses.push(course._id);
    course.students.push(student._id);

    await Promise.all([student.save(), course.save()]);
    return res.status(200).json({ message: "You are enrolled successfully" });
  } catch (err) {
    // console.log(err);
    return next({
      status: 404,
      message: "Resource not found",
      extraDetails: `Either the course id or the cms id is invalid`,
    });
  }
};

exports.dropCourse = async (req, res, next) => {
  try {
    const { courseID, cmsID } = req.body;
    const student = await Student.findOne({ cmsID }, { password: 0 });
    if (!student) {
      return next({
        status: 404,
        message: "Resource not found",
        extraDetails: `No student found with provided cmsID: ${cmsID}`,
      });
    }

    const course = await Course.findOne({ courseID });
    if (!course) {
      return next({
        status: 404,
        message: "Resource not found",
        extraDetails: `No course found with provided courseID: ${courseID}`,
      });
    }

    if (!student.courses.includes(course._id)) {
      return next({
        status: 409,
        message: "Conflict",
        extraDetails: "The student is not enrolled in the course",
      });
    }

    student.courses.pull(course._id);
    course.students.pull(student._id);

    await Promise.all([student.save(), course.save()]);
    return res.status(200).json({ message: "Successfully dropped" });
  } catch (err) {
    // console.log(err);
    return next({
      status: 404,
      message: "Resource not found",
      extraDetails: `Either the course id or the cms id is invalid`,
    });
  }
};