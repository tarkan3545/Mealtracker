import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
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
  };

  const addMeal = async () => {
    if (!name || !quantity) {
      alert("Please enter food name and quantity");
      return;
    }

    const res = await fetch("http://localhost:5000/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        quantity: Number(quantity)
      })
    });

    const newMeal = await res.json();

    setMeals([...meals, newMeal]);
    setName("");
    setQuantity("");
  };

  const deleteMeal = async (id) => {
    await fetch(`http://localhost:5000/api/meals/${id}`, {
      method: "DELETE"
    });

    setMeals(meals.filter((meal) => meal._id !== id));
  };

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Meal Tracker</h1>
      <p>Fullstack app with React, Node.js, Express and MongoDB.</p>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <button onClick={addMeal} style={{ marginLeft: "10px" }}>
          Add Meal
        </button>
      </div>

      {loading ? (
        <p>Loading meals...</p>
      ) : meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal._id}>
              Food: {meal.name || "Unknown"} | Quantity: {meal.quantity}

              <button
                onClick={() => deleteMeal(meal._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;