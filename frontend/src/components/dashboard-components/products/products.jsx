import React, { useState } from "react";
import styles from "./Products.module.css";

export default function Products() {
  // Mock product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic Jeans",
      description: "High-quality denim jeans",
      price: "$49.99",
      category: "jeans",
      favorite: false,
    },
    {
      id: 2,
      name: "Cotton T-Shirt",
      description: "Comfortable cotton t-shirt",
      price: "$19.99",
      category: "t-shirts",
      favorite: false,
    },
    {
      id: 3,
      name: "Running Shoes",
      description: "Lightweight and durable",
      price: "$89.99",
      category: "shoes",
      favorite: false,
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleFavorite = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, favorite: !product.favorite } : product
      )
    );
  };

  const handleEdit = (id) => {
    console.log("Edit product with ID:", id);
    // Logic to open a modal or redirect to an edit page
  };

  return (
    <div className={styles.container}>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className={product.favorite ? styles.favoriteRow : ""}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    className={styles.favoriteButton}
                    onClick={() => handleFavorite(product.id)}
                  >
                    {product.favorite ? "Unfavorite" : "Favorite"}
                  </button>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
