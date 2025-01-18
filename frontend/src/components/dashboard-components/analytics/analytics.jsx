import React, { useState } from "react";
import styles from "./analytics.module.css";

const mockData = {
  revenue: 12500,
  totalSales: 350,
  newSignups: 45,
  cartAbandonmentRate: "12%",
  bestSellingProducts: [
    { id: 1, name: "Jeans", sales: 120 },
    { id: 2, name: "T-shirts", sales: 100 },
    { id: 3, name: "Shoes", sales: 80 },
  ],
  lowStock: [
    { id: 4, name: "Glasses", stock: 5 },
    { id: 5, name: "Jackets", stock: 2 },
  ],
};

export default function Analytics() {
  const [data] = useState(mockData);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Analytics Overview</h1>

      <div className={styles.summaryCards}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Total Revenue</h3>
          <p className={styles.cardValue}>${new Intl.NumberFormat().format(data.revenue)}</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Total Sales</h3>
          <p className={styles.cardValue}>{data.totalSales} items</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>New Signups</h3>
          <p className={styles.cardValue}>{data.newSignups} users</p>
        </div>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Cart Abandonment</h3>
          <p className={styles.cardValue}>{data.cartAbandonmentRate}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Best-Selling Products</h2>
        <ul className={styles.list}>
          {data.bestSellingProducts.map((product) => (
            <li key={product.id} className={styles.listItem}>
              {product.name} - {product.sales} sales
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Low Stock Alerts</h2>
        {data.lowStock.length > 0 ? (
          <ul className={styles.list}>
            {data.lowStock.map((item) => (
              <li key={item.id} className={styles.lowStockItem}>
                {item.name} - Only {item.stock} left in stock!
              </li>
            ))}
          </ul>
        ) : (
          <p>All products are well-stocked!</p>
        )}
      </div>
    </div>
  );
}
