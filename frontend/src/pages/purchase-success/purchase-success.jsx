import React from "react";
import { Link } from "react-router-dom";
import styles from "./purchase-success.module.css";

export default function PurchaseSuccessPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thank You for Your Purchase!</h1>
      <p className={styles.message}>
        Your order has been successfully placed. We appreciate your business and hope to see you again soon!
      </p>
      <Link to="/" className={styles.homeButton}>
        Continue Shopping
      </Link>
    </div>
  );
}
