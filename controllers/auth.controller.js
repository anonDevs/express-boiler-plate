const Admin = require("../models/Admin");
const { AppError } = require("../middleware/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/*
 * Logs in the user and sends back the token.
 *
 * - PARAMETERS
 *   - email
 *   - password
 *
 * */
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      throw new AppError(400, "Invalid username/password.");
    }

    const credentialsVerified = await bcrypt.compare(password, user.password);

    if (!credentialsVerified) {
      throw new AppError(400, "Invalid username/password.");
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: "Success",
      token,
      userName: user.fullName,
    });
  } catch (e) {
    next(e);
  }
};
