// import React, { useEffect, useState } from "react";
// import "../../Template/LayoutMain/LayoutMain/Layout.css";
// import RooferTable from "./RooferTable/RooferTable";

// const Roofers = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
//     const stored = sessionStorage.getItem("isSidebarOpen");
//     return stored !== null ? JSON.parse(stored) : true;
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const stored = sessionStorage.getItem("isSidebarOpen");
//       const parsed = stored !== null ? JSON.parse(stored) : true;

//       if (parsed !== isSidebarOpen) {
//         setIsSidebarOpen(parsed);
//       }
//     }, 10);

//     return () => clearInterval(interval);
//   }, [isSidebarOpen]);

//   return (
//     <div
//       className={`content-container ${
//         isSidebarOpen ? "sidebar-open" : "sidebar-closed"
//       }`}
//       style={{ marginTop: "30px" }}
//     >
//       <h2 >Roofers</h2>
//       <RooferTable/>
//     </div>
//   );
// };

// export default Roofers;


import React, { useEffect, useState } from "react";
import "../../Template/LayoutMain/LayoutMain/Layout.css";
import "./Roofers.css";

import EmployerTable from "./EmployerTable/EmployerTable";
import ContractorTable from "./ContractorTable/ContractorTable";

const Roofers = () => {
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

    <h2 className="mb-4">Roofers</h2>

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
    {activeTab === "employer" ? <EmployerTable /> : <ContractorTable />}

  </div>
</div>

  );
};

export default Roofers;
