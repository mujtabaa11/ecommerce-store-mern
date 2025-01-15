import { useParams } from "react-router-dom";
import styles from "./category.module.css";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      <div className={styles.messageContainer}>
        <p className={styles.message}>
          No products are currently available for the {category} category.
        </p>
      </div>
    </div>
  );
}
