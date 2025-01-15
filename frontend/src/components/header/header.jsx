import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>Ecommerce Store</h1>
      </Link>
      <nav>
        <Link to="/signup">
          <button className={styles.button}>Signup</button>
        </Link>
        <Link to="/login">
          <button className={styles.button}>Login</button>
        </Link>
      </nav>
    </div>
  );
}
