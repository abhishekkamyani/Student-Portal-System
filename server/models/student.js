const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  cmsID: {
    type: String,
    match: [/^\d{3}-\d{2}-\d{4}$/],
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase(),
  },
  lastName: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase(),
  },
  gender: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase(),
  },
  address: {
    type: String,
    set: (value) => value.toLowerCase(),
  },
  city: {
    type: String,
    set: (value) => value.toLowerCase(),
  },
  // phoneNumber: {
  //   type: String,
  //   match: [/^03\d{2}-\d{3}-\d{4}$/],
  //   required: true,
  //   unique: true,
  // },
  email: {
    type: String,
    match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/],
    unique: true,
    required: true,
    set: (value) => value.toLowerCase(),
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  program: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase(),
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// studentSchema.index({ email: 1, cmsID: 1, phoneNumber: 1 }, { unique: true });
studentSchema.index({ email: 1, cmsID: 1 }, { unique: true });

exports.Student = mongoose.model("Student", studentSchema);
