const express = require("express");
const router = express.Router();

const MealLog = require("../models/MealLog");

// CREATE meal
router.post("/", async (req, res) => {
  try {
    const meal = new MealLog(req.body);
    const savedMeal = await meal.save();
    res.status(201).json(savedMeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE meal
router.delete("/:id", async (req, res) => {
  try {
    await MealLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Meal deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all meals
router.get("/", async (req, res) => {
  try {
    const meals = await MealLog.find()
      .populate("user")
      .populate("food");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;