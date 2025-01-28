import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./signup.module.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // To handle form errors

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: apiError, success } = useSelector((state) => state.auth);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear any previous error
    dispatch(registerUser(formData)); // Dispatch register action
  };

  // Redirect user on success
  React.useEffect(() => {
    if (success) {
      navigate("/login"); // Redirect to login page after successful registration
    }
  }, [success, navigate]);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {apiError && <p className={styles.error}>{apiError}</p>}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
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
