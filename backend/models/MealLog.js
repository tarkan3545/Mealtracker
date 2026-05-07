const mongoose = require("mongoose");

const mealLogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MealLog", mealLogSchema);