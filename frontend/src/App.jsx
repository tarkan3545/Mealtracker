import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Meal Tracker</h1>
      <p>Fullstack app with React, Node.js, Express and MongoDB.</p>

      {loading ? (
        <p>Loading meals...</p>
      ) : meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal._id}>
              Food: {meal.food?.name || "Unknown"} | Quantity: {meal.quantity}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;