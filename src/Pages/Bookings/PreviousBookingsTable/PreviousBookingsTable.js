import React, { useEffect, useState } from "react";
import { getPreviousBookings } from "../../../utils/APIs/bookingsApis";
import BookingsTable from "../BookingsTable/BookingsTable";

const PreviousBookingsTable = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2026-01-14");

  const fetchData = async () => {
    const res = await getPreviousBookings(fromDate, toDate);
    setData(res.data?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="filters">
        <div>
          <label>From Date</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>

        <div>
          <label>To Date</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>

        <button onClick={fetchData} className="filter-btn">Apply</button>
      </div>

      <BookingsTable data={data} />
    </>
  );
};

export default PreviousBookingsTable;




// import React, { useState } from "react";
// import "../Bookings.css";
// import ViewDocumentation from "../ViewDocumentation/ViewDocumentation";
// import RequestModal from "../RequestModal/RequestModal";

// const PreviousBookingsTable = () => {
//   const [showDocs, setShowDocs] = useState(false);
//   const [docsData, setDocsData] = useState([]);

//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const [rowStatus, setRowStatus] = useState({
//     1: "pending",
//     2: "pending",
//   });

//   // 🔹 EXTENDED SAMPLE DATA (to test pagination)
//   const sampleData = Array.from({ length: 40 }).map((_, i) => ({
//     id: i + 1,
//     name: `Employer ${i + 1}`,
//     email: `emp${i + 1}@example.com`,
//     location: "Dubai",
//     documents: ["/docs/doc1.png"],
//   }));

//   // --------------------------------------------------
//   // 🔹 PAGINATION LOGIC (10 rows per page)
//   // --------------------------------------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   const totalPages = Math.ceil(sampleData.length / rowsPerPage);

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;

//   const currentRows = sampleData.slice(indexOfFirstRow, indexOfLastRow);

//   // Sliding window of 3 pages
//   let startPage = Math.max(1, currentPage - 1);
//   let endPage = Math.min(startPage + 2, totalPages);

//   if (endPage - startPage < 2) {
//     startPage = Math.max(1, endPage - 2);
//   }

//   const visiblePages = [];
//   for (let i = startPage; i <= endPage; i++) {
//     visiblePages.push(i);
//   }

//   const goToPage = (pageNum) => setCurrentPage(pageNum);
//   const nextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
//   const previousPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);
//   // --------------------------------------------------

//   const handleViewDocs = (docs) => {
//     setDocsData(docs);
//     setShowDocs(true);
//   };

//   const openRequestModal = (id) => {
//     setSelectedRow(id);
//     setShowRequestModal(true);
//   };

//   const handleRequestResult = (result) => {
//     setRowStatus((prev) => ({
//       ...prev,
//       [selectedRow]: result,
//     }));
//   };

//   return (
//     <div className="container p-0 mt-4">
//       <div className="table-responsive table-container shadow-sm">

//         <table className="table table-bordered table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Sr No</th>
//               <th>Employer Name</th>
//               <th>Email</th>
//               <th>Location</th>
//               <th>Documents</th>
//               <th>Action</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentRows.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{indexOfFirstRow + index + 1}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.location}</td>

//                 <td>
//                   <button
//                     className="btn btn-outline-primary btn-sm"
//                     onClick={() => handleViewDocs(item.documents)}
//                   >
//                     View Docs
//                   </button>
//                 </td>

//                 <td>
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => openRequestModal(item.id)}
//                   >
//                     Request
//                   </button>
//                 </td>

//                 <td>
//                   {rowStatus[item.id] === "pending" && (
//                     <span style={{ color: "orange", fontWeight: "600" }}>
//                       Pending
//                     </span>
//                   )}

//                   {rowStatus[item.id] === "accepted" && (
//                     <span style={{ color: "green", fontWeight: "600" }}>
//                       Accepted
//                     </span>
//                   )}

//                   {rowStatus[item.id] === "rejected" && (
//                     <span style={{ color: "red", fontWeight: "600" }}>
//                       Rejected
//                     </span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 🔹 PAGINATION UI */}
//       <div className="pagination-container mt-3 d-flex justify-content-center">
//         <button
//           className="btn btn-light me-2"
//           onClick={previousPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>

//         {visiblePages.map((page) => (
//           <button
//             key={page}
//             className={`btn me-2 ${
//               currentPage === page ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => goToPage(page)}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           className="btn btn-light"
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       <ViewDocumentation
//         show={showDocs}
//         onHide={() => setShowDocs(false)}
//         docs={docsData}
//       />

//       <RequestModal
//         show={showRequestModal}
//         onHide={() => setShowRequestModal(false)}
//         onResult={handleRequestResult}
//       />
//     </div>
//   );
// };

// export default PreviousBookingsTable;
