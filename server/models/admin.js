const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  adminID: {
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
  // phoneNumber: {
  //   type: String,
  //   match: [/^03\d{2}-\d{3}-\d{4}$/],
  //   required: true,
  //   unique: true,
  // },
  role: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase(),
  },
});

adminSchema.index({ email: 1, adminID: 1, }, { unique: true });
// adminSchema.index({ email: 1, adminID: 1 }, { unique: true });

exports.Admin = mongoose.model("Admin", adminSchema);
