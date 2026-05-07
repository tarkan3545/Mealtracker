import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = () => {
    fetch("http://localhost:5000/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setMeals(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setLoading(false);
      });
  };

  const addMeal = async () => {
    if (!user || !name || !quantity || !category) {
      alert("Please enter user, food name, quantity and category");
      return;
    }

    const res = await fetch("http://localhost:5000/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        name,
        quantity: Number(quantity),
        category,
      }),
    });

    const newMeal = await res.json();

    setMeals([...meals, newMeal]);

    setUser("");
    setName("");
    setQuantity("");
    setCategory("");
  };

  const deleteMeal = async (id) => {
    await fetch(`http://localhost:5000/api/meals/${id}`, {
      method: "DELETE",
    });

    setMeals(meals.filter((meal) => meal._id !== id));
  };

  const totalQuantity = meals.reduce(
    (sum, meal) => sum + Number(meal.quantity || 0),
    0
  );

  return (
    <main>
      <h1>Meal Tracker</h1>

      <p>
        Fullstack app with React, Node.js, Express and MongoDB.
      </p>

      <div className="stats">
        <p>Total meals: {meals.length}</p>
        <p>Total quantity: {totalQuantity}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="User name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

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
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button onClick={addMeal}>
          Add Meal
        </button>
      </div>

      <h2>Meal List</h2>

      {loading ? (
        <p>Loading meals...</p>
      ) : meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal._id}>
              <div className="meal-details">
                <div>
                  <strong>User:</strong>{" "}
                  {meal.user || "Unknown"}
                </div>

                <div>
                  <strong>Food:</strong>{" "}
                  {meal.name || "Unknown"}
                </div>

                <div>
                  <strong>Quantity:</strong>{" "}
                  {meal.quantity}
                </div>

                <div>
                  <strong>Category:</strong>{" "}
                  {meal.category || "No category"}
                </div>
              </div>

              <button onClick={() => deleteMeal(meal._id)}>
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