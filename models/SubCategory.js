const { model, Schema } = require("mongoose");

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const SubCategory = model("Category", subCategorySchema);
module.exports = SubCategory;
