import React from "react";
import styles from "./cart-item.module.css";

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className={styles.cartItem}>
      <img src={item.imageUrl} alt={item.name} className={styles.productImage} />
      <div className={styles.details}>
        <h3 className={styles.productName}>{item.name}</h3>
        <p className={styles.productPrice}>${item.price.toFixed(2)}</p>
        <div className={styles.quantityControl}>
          <button
            className={styles.decrement}
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            className={styles.increment}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button className={styles.removeButton} onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}
