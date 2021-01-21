const { AppError } = require("./error");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
/*
 * Checks if the user accessing the resource is logged in
 * If not returns an error
 *
 * Sets a req.user object that can be used to access the user data in future requests.
 * */
const checkIfLoggedIn = async (req, res, next) => {
  try {
    // If no authorization code is provided.
    if (!req.headers.authorization) {
      throw new AppError(403, "Please log in.");
    }

    //  extract and verify the token
    const token = req.headers.authorization.split(" ")[1];

    const currentUser = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await Admin.findById(currentUser.id);

    if (!user) {
      throw new AppError(403, "Invalid token.");
    }

    req.currentUser = user;

    next();
  } catch (e) {
    next(e);
  }
};

/*
 * Checks if the user accessing the resource is a super admin
 *
 * Middleware to be run only after the checkIfLoggedIn middleware
 * since it is depedant on the req.user object set by checkIfLoggedIn middleware.
 * */
const checkIfSuperAdmin = async (req, res, next) => {
  try {
    if (!req.currentUser.superAdmin) {
      throw new AppError(401, "Insufficient privileges.");
    }

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkIfLoggedIn,
  checkIfSuperAdmin,
};
