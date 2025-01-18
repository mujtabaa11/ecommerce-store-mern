import React, { useState } from "react";
import CreateProduct from "../../components/dashboard-components/create-product/create-product";
import Products from "../../components/dashboard-components/products/products";
import Analytics from "../../components/dashboard-components/analytics/analytics";
import styles from "./admin-panel.module.css";

const tabs = [
  { id: "create", label: "Create Product", icon: "🏷️" },
  { id: "products", label: "Products", icon: "📦" },
  { id: "analytics", label: "Analytics", icon: "📈" },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.icon}>{tab.icon}</span>
            <p className={styles.label}>{tab.label}</p>
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === "create" && <CreateProduct />}
        {activeTab === "products" && <Products />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </div>
  );
}
