import { Link } from "react-router-dom";
import styles from "./signup.module.css";

export default function Signup() {
  return (
    <div className={styles.formContainer}>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input id="name" type="text" name="name" className={styles.input} required />
        </div>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm password
          </label>
          <input id="confirmPassword" type="password" name="confirmPassword" className={styles.input} required />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      <p>
        Already a member?{" "}
        <Link to="/login" className={styles.linkText}>
          Login
        </Link>
      </p>
    </div>
  );
}
