import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import "./SubscriptionPlans.css";

import SubscriptionPlansEmployer from "./SubscriptionPlansEmployer/SubscriptionPlansEmployer";
import SubscriptionPlansContractor from "./SubscriptionPlansContractor/SubscriptionPlansContractor";

const SubscriptionPlans = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = sessionStorage.getItem("isSidebarOpen");
    return stored !== null ? JSON.parse(stored) : true;
  });

  const [activeTab, setActiveTab] = useState("employer");

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = sessionStorage.getItem("isSidebarOpen");
      const parsed = stored !== null ? JSON.parse(stored) : true;

      if (parsed !== isSidebarOpen) {
        setIsSidebarOpen(parsed);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isSidebarOpen]);

  return (
<div
  className={`content-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
  style={{ marginTop: "100px" }}
>
  <div className="page-inner-wrapper">

    <h2 className="mb-4">Subscription Plan Update</h2>

    {/* Tabs */}
    <div className="custom-tabs">
      <div
        className={`tab-item ${activeTab === "employer" ? "active" : ""}`}
        onClick={() => setActiveTab("employer")}
      >
        Employer (Company)
      </div>

      <div
        className={`tab-item ${activeTab === "contractor" ? "active" : ""}`}
        onClick={() => setActiveTab("contractor")}
      >
        Contractor (Worker)
      </div>
    </div>

    {/* Table */}
    {activeTab === "employer" ? <SubscriptionPlansEmployer /> : <SubscriptionPlansContractor />}

  </div>
</div>

  );
};

export default SubscriptionPlans;
