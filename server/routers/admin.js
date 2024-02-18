const express = require("express")
const Router = express.Router();
const adminController = require("../controllers/admin");

Router.get('/' , adminController.getAllAdmins);
 

exports.Router = Router;
// module.exports = Router;