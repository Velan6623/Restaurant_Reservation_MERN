import React, { useState } from "react";

const Cart = ({ cartItems, removeFromCart }) => {
  const [buttonColor, setButtonColor] = useState("#28a745"); // Initial color is green

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    alert("Hurrah! Your order has been placed!");
    setButtonColor("#dc3545"); // Change button color to red
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "5px 10px",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2>Total: ₹{totalPrice}</h2>
          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: "20px",
              backgroundColor: buttonColor, // Dynamic color
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;