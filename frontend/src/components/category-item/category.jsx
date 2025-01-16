import { Link } from "react-router-dom";
import styles from "./category.module.css";

export default function CategoryItem({ category }) {
  return (
    <div className={styles.container}>
      <Link to={`/category${category.href}`} className={styles.link}>
        <div className={styles.card}>
          <img
            src={category.imageUrl}
            alt={category.name}
            className={styles.image}
          />
          <p className={styles.name}>{category.name}</p>
        </div>
      </Link>
    </div>
  );
}
