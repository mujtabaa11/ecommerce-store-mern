import React from "react";
import CategoryItem from "../../components/category-item/category";
import styles from "./Home.module.css";

export default function Home() {
  const categories = [
    { id: 1, href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { id: 2, href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { id: 3, href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { id: 4, href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { id: 5, href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { id: 6, href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
    { id: 7, href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Explore Our Categories</h1>
        <p className={styles.subtitle}>Discover the latest trends in eco-friendly fashion</p>
      </div>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
