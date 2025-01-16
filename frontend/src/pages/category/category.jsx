import { useParams } from "react-router-dom";
import styles from "./category.module.css";
import Product from "../../components/product/product";

export default function CategoryPage() {
  const { category } = useParams();
  let products = [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      { products && products.length > 0
      ? products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <Product product={product}/>
        </div>
      ))
      : <div className={styles.messageContainer}>
        <p className={styles.message}>
          No products are currently available for the {category} category.
        </p>
      </div>
}
    </div>
  );
}
