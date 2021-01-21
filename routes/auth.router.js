const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.route("/").post(authController.loginAdmin);

module.exports = router;
