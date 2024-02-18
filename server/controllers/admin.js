const model = require("../models/admin");
const Admin = model.Admin;

exports.getAllAdmins = async (req, res, next) => {
  try {
    const docs = await Admin.find();
    if (!docs.length) {
      next({
        status: 401,
        message: "Resource not found",
        extraDetails: "Resource not found",
      });
    } else {
      res.status(200).json(docs);
    }
  } catch (err) {
    next({});
  }
};
 