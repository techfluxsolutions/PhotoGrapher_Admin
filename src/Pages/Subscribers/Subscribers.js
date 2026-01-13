import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import "./Subscribers.css";
import SubscribersEmployerTable from "./SubscribersEmployerTable/SubscribersEmployerTable";
import SubscribersContractorTable from "./SubscribersContractorTable/SubscribersContractorTable";

const Subscribers = () => {
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

    <h2 className="mb-4">Subscribers History</h2>

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
    {activeTab === "employer" ? <SubscribersEmployerTable /> : <SubscribersContractorTable />}

  </div>
</div>

  );
};

export default Subscribers;


// import React from 'react'

// const Subscribers = () => {
//   return (
//     <div>Subscribers</div>
//   )
// }

// export default Subscribers