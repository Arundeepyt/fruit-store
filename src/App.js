import React, { useState } from "react";
import "./App.css";

const initialData = [
  { id: 1, name: "Apple", price: 100, icon: "🍎" },
  { id: 2, name: "Banana", price: 50, icon: "🍌" },
  { id: 3, name: "Mango", price: 150, icon: "🥭" },
  { id: 4, name: "Orange", price: 70, icon: "🍊" },
  { id: 5, name: "Pineapple", price: 120, icon: "🍍" },
];

export default function App() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "low-high") return a.price - b.price;
    if (sortOrder === "high-low") return b.price - a.price;
    return 0;
  });

  const totalPrice = sorted.reduce((acc, item) => acc + item.price, 0);

  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const resetFilters = () => {
    setSearch("");
    setSortOrder("");
    setData(initialData);
  };

  return (
    <div className="container">
      <h1>Fruit Store</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Sort by price</option>
        <option value="low-high">Low to High</option>
        <option value="high-low">High to Low</option>
      </select>
      <button onClick={resetFilters}>Reset</button>

      <h2>Fruit List</h2>
      <ul>
        {sorted.map((item) => (
          <li key={item.id}>
            <span>
              <span className="fruit-icon">{item.icon}</span>
              {item.name} - ₹{item.price}
            </span>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Total Price: ₹{totalPrice}</h3>
    </div>
  );
}