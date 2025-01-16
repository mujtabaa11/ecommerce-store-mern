import React, { useState } from "react";
import CartItem from "../../components/cart-item/cart-item";
import styles from "./cart.module.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = coupon === "SAVE10" ? 0.1 : 0;
  const totalDue = cartTotal - cartTotal * discount;

  function handleCoupon() {
    console.log("Coupon added:", coupon);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart Summary</h1>
      {cart.length === 0 ? (
        <div className={styles.emptyCartMessage}>
          <p>Your cart is empty. Shop now!</p>
        </div>
      ) : (
        <div>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id}>
                <CartItem
                  item={item}
                  onRemove={(id) => {
                    setCart((prevCart) =>
                      prevCart.filter((item) => item.id !== id)
                    );
                  }}
                  onUpdateQuantity={(id, quantity) => {
                    setCart((prevCart) =>
                      prevCart.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                      )
                    );
                  }}
                />
              </div>
            ))}
          </div>
          <p className={styles.cartTotal}>
            Cart total: ${cartTotal.toFixed(2)}
          </p>
          <div className={styles.couponContainer}>
            <input
              className={styles.couponInput}
              id="coupon"
              name="coupon"
              type="text"
              placeholder="Have a coupon? Enter it here"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className={styles.couponButton} onClick={handleCoupon}>
              Apply
            </button>
          </div>
          <p className={styles.totalDue}>Total Due: ${totalDue.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
