import { Link } from "react-router-dom";
import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.formContainer}>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input id="email" type="email" name="email" className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input id="password" type="password" name="password" className={styles.input} required />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p>
        Not a member?{" "}
        <Link to="/signup" className={styles.linkText}>
          Sign up now
        </Link>
      </p>
    </div>
  );
}
