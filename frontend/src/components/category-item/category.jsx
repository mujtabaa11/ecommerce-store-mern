import React from "react";
import { Link } from "react-router-dom";
import styles from "./category.module.css";

export default function CategoryItem({ categoty }) {
  return (
    <div className={styles.container}>
      <Link to={categoty.href} className={styles.link}>
        <div className={styles.card}>
          <img
            src={categoty.imageUrl}
            alt={categoty.name}
            className={styles.image}
          />
          <p className={styles.name}>{categoty.name}</p>
        </div>
      </Link>
    </div>
  );
}
