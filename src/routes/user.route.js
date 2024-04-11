const UserService = require("../services/user.service");
const express = require("express");
const UserController = require("../controller/user_controller");
const tokenValidation = require("../middleware/token.validation");
const router = express.Router();

const userService = new UserService();

router.post("/login", (req, res, next) => {
  UserController.loginUser(req, res, userService);
});

router.post("/", (req, res, next) =>
  UserController.createUser(req, res, userService)
);
router.get(
  "/list",
  (req, res, next) => tokenValidation(req, res, next, "STAFF"),
  (req, res, next) => UserController.findAllEmployees(req, res, userService)
);

router.get("/:id", (req, res, next) =>
  UserController.getEmployeeByID(req, res, userService)
);

router.post("/absence/in", (req, res, next) =>
  UserController.createAbsenceIn(req, res, userService)
);

router.post("/absence/out", (req, res, next) =>
  UserController.createAbsenceOut(req, res, userService)
);
module.exports = router;
