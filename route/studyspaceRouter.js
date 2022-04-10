const express = require("express");
const Router = express.Router();
const studySpaceController = require("../controller/studyspaceController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.protect);

Router.route("/studyspace")
  .post(
    AuthController.restrictTo("instructor", "admin"),
    studySpaceController.createSpace
  )
  .get(AuthController.restrictTo("admin"), studySpaceController.getAllSpace);
//INSTRUCTORS CAN GET AND UPDATE THIER OWNS STUDENTS STUDYSPACE
Router.route("/student/studyspace").get(
  AuthController.restrictTo("instructor", "admin"),
  studySpaceController.getMyStudentSpace
);
Router.route("/student/studyspace/:id")
  .patch(
    AuthController.restrictTo("instructor", "admin"),
    studySpaceController.updateSpace
  )
  .delete(
    AuthController.restrictTo("instructor", "admin"),
    studySpaceController.deletSpace
  );
//STUDENDTS CAN GET THIER OWN STUDYSPACE BASED ON THEIR COURSES
Router.route("/My/studyspace").get(
  AuthController.restrictTo("student", "admin"),
  studySpaceController.getMyspace
);
module.exports = Router;
