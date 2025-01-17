import React from "react";
import { Link } from "react-router-dom";
import styles from "./purchase-cancel.module.css";

export default function PurchaseCancelPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchase Canceled</h1>
      <p className={styles.message}>
        Your purchase was not completed. If you encountered an issue, please try again or contact our support team.
      </p>
      <Link to="/" className={styles.homeButton}>
        Return to Home
      </Link>
    </div>
  );
}
