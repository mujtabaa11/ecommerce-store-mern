import React from "react";
import styles from "./product.module.css";

export default function Product({ product }) {
  return (
    <div className={styles.productContainer}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles.productImage}
      />
      <h2 className={styles.productName}>{product.name}</h2>
      <p className={styles.productPrice}>${product.price}</p>
      <button className={styles.addToCartButton}>Add to Cart</button>
    </div>

  );
}
