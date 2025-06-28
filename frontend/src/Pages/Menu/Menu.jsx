import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const dishes = [
  { id: 1, name: "Spicy Grilled Chicken", price: 250, image: "/image4.png" },
  { id: 2, name: "Pasta Alfredo", price: 200, image: "/image3.png" },
  { id: 3, name: "Paneer Tikka", price: 180, image: "/image2.png" },
  { id: 4, name: "Chocolate Lava Cake", price: 150, image: "/image1.png" },
  { id: 5, name: "Margherita Pizza", price: 300, image: "/image5.png" },
  { id: 6, name: "Caesar Salad", price: 120, image: "/image6.png" },
  { id: 7, name: "Butter Naan", price: 50, image: "/image7.png" },
  { id: 8, name: "Tandoori Roti", price: 40, image: "/image8.png" },
  { id: 9, name: "Chicken Biryani", price: 350, image: "/image9.png" },
  { id: 10, name: "Veg Manchurian", price: 220, image: "/image10.png" },
  { id: 11, name: "Fish Curry", price: 400, image: "/image11.png" },
  { id: 12, name: "Mango Lassi", price: 80, image: "/image.png" },
];

const Menu = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [addedToCart, setAddedToCart] = useState({}); // Track items added to cart
  const navigate = useNavigate();

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const handleAddToCart = (dish) => {
    addToCart({
      ...dish,
      quantity: quantities[dish.id] || 1,
    });
    setAddedToCart((prev) => ({
      ...prev,
      [dish.id]: true, // Mark the item as added to cart
    }));
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Our Menu</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        {dishes.map((dish) => (
          <div
            key={dish.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <img
              src={dish.image}
              alt={dish.name}
              style={{
                width: "300px", // Fixed width
                height: "200px", // Fixed height
                objectFit: "cover", // Ensures the image fits within the dimensions
                borderRadius: "10px"
              }}
            />
            <h3>{dish.name}</h3>
            <p>₹{dish.price}</p>
            <div>
              <button
                onClick={() => handleQuantityChange(dish.id, -1)}
                disabled={!quantities[dish.id]}
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>
                {quantities[dish.id] || 0}
              </span>
              <button onClick={() => handleQuantityChange(dish.id, 1)}>+</button>
            </div>
            <button
              onClick={() => handleAddToCart(dish)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: addedToCart[dish.id] ? "#dc3545" : "#28a745", // Red if added, green otherwise
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              disabled={addedToCart[dish.id]} // Disable button if already added
            >
              {addedToCart[dish.id] ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/cart")} // Navigate to the cart page
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default Menu;