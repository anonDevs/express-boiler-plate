const { model, Schema } = require("mongoose");

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

adminSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

adminSchema.set("toObject", {
  virtuals: true,
});

adminSchema.set("toJSON", {
  virtuals: true,
});

const Admin = model("Admin", adminSchema);

module.exports = Admin;
