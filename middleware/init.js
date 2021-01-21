const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

module.exports = async () => {
  try {
    const adminUsers = await Admin.find();
    const password = await bcrypt.hash("p@ssw0rd", 8);
    if (adminUsers.length === 0) {
      await Admin.create({
        firstName: "Default",
        lastName: "Admin",
        password,
        email: "admin@dhuhkaan.com",
        superAdmin: true,
      });
      console.log(
        `-----------------------\n\nThe default user has been created!\nEmail: admin@dhuhkaan.com\nPassword: p@ssw0rd\n\n-----------------------`
      );
    }
  } catch (e) {
    console.log(e);
  }
};
