import React, { useState } from "react";
import CreateProduct from "../../components/dashboard-components/create-product/create-product";
import Products from "../../components/dashboard-components/products/products";
import Analytics from "../../components/dashboard-components/analytics/analytics";

const tabs = [
	{ id: "create", label: "Create Product" },
	{ id: "products", label: "Products" },
	{ id: "analytics", label: "Analytics"},
];

export default function AdminPanel() {

    const [activeTab, setActiveTab] = useState("create");

  return (
    <div>

        <div className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`tab ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    <p className="tab-label">{tab.label}</p>
                </button>
            ))}
        </div>
{/* Render the active tab content 
        {activeTab === "create" && <CreateProduct />}
        {activeTab === "products" && <Products />}
        {activeTab === "analytics" && <Analytics />}
*/}
    </div>
  )
}
