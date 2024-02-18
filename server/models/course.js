const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  courseID: {
    type: String,
    required: [true, "Course-ID is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Course-Name is required"],
    set: (value) => value.toLowerCase(),
  },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

courseSchema.index({ courseID: 1, students: 1, }, { unique: true });

// courseSchema.pre("updateOne", async function (next) {
//   const studentId = this._update.$addToSet.students;

//   const course = await this.model.findOne(this.getQuery());

//   if (course.students.includes(studentId)) {
//     const error = new Error("Student ID already exists in the array.");
//     next(error);
//   } else {
//     next();
//   }
// });


exports.Course = mongoose.model("Course", courseSchema);
exports.courseSchema = courseSchema;