// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }

    // Update total based on the new cart
    updateTotal();
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));

    // Update total based on the new cart
    updateTotal();
  };

  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    // Update total based on the new cart
    updateTotal();
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);

    // Update total based on the new cart
    updateTotal();
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  // Function to update the total based on the current cart
  const updateTotal = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      totalCost += item.price * item.quantity;
    });
    setTotal(totalCost);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
