const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const mealRoutes = require("./routes/mealRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/meals", mealRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});