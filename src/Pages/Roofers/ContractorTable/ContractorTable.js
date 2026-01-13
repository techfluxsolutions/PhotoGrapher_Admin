// import React, { useState } from "react";
// import "../Roofers.css";
// import ViewDocumentation from "../ViewDocumentation/ViewDocumentation";
// import RequestModal from "../RequestModal/RequestModal";

// const ContractorTable = () => {
//   const [showDocs, setShowDocs] = useState(false);
//   const [docsData, setDocsData] = useState([]);

//   const [showRequestModal, setShowRequestModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const [rowStatus, setRowStatus] = useState({
//     1: "pending",
//     2: "pending",
//   });

//   // 🔹 EXTENDED SAMPLE DATA (for pagination demo)
//   const sampleData = Array.from({ length: 40 }).map((_, i) => ({
//     id: i + 1,
//     name: `Contractor ${i + 1}`,
//     email: `contractor${i + 1}@example.com`,
//     location: "City",
//     documents: ["/docs/cont1.png"],
//   }));

//   // -------------------------------------------
//   // 🔹 PAGINATION LOGIC (10 rows/page)
//   // -------------------------------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   const totalPages = Math.ceil(sampleData.length / rowsPerPage);

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;

//   const currentRows = sampleData.slice(indexOfFirstRow, indexOfLastRow);

//   // Sliding window of 3 page numbers
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

//   // -------------------------------------------

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
//               <th>Contractor Name</th>
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

// export default ContractorTable;





import React, { useState, useEffect } from "react";
import "../Roofers.css";
import ViewDocumentation from "../ViewDocumentation/ViewDocumentation";
import RequestModal from "../RequestModal/RequestModal";
import { toast } from "react-toastify";
import { getContractorAPI } from "../../../utils/APIs/roofersApis";

const ContractorTable = () => {
  const [showDocs, setShowDocs] = useState(false);
  const [docsData, setDocsData] = useState([]);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [rowStatus, setRowStatus] = useState({});
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState([]);

  // -------------------------------------------
  // 🔹 FETCH WORKERS USING YOUR API FILE
  // -------------------------------------------
  const getEmployersData = async () => {
    try {
      const token = sessionStorage.getItem("TokenForHireRooferAdmin");

      setLoading(true);

      const response = await getContractorAPI(token);  // ✅ REPLACED AXIOS

      setLoading(false);

      if (response?.data?.success) {
        setTableData(response.data.data.items || []);
      } else {
        toast.error(response?.data?.message || "Failed to fetch data.");
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("Failed to load contractor list.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployersData();
  }, []);

  // -------------------------------------------
  // 🔹 FRONTEND PAGINATION ONLY
  // -------------------------------------------
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(startPage + 2, totalPages);
  if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) visiblePages.push(i);

  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const previousPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  // -------------------------------------------
  const handleViewDocs = (item) => {
    let docs = [];

    if (item.gallery?.length) docs.push(...item.gallery);
    if (item.insurance) docs.push(item.insurance);
    if (item.license) docs.push(item.license);

    setDocsData(docs);
    setShowDocs(true);
  };

  const openRequestModal = (id) => {
    setSelectedRow(id);
    setShowRequestModal(true);
  };

  const handleRequestResult = (result) => {
    setRowStatus((prev) => ({
      ...prev,
      [selectedRow]: result,
    }));
  };

  return (
    <div className="container p-0 mt-4">

      {loading && (
        <div className="text-center fw-bold py-2">Loading...</div>
      )}

      <div className="table-responsive table-container shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>Worker Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Documents</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.length === 0 && !loading && (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No data found
                </td>
              </tr>
            )}

            {currentRows.map((item, index) => (
              <tr key={item._id}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>{item.name || "N/A"}</td>
                <td>{item.user?.email || "N/A"}</td>
                <td>{item.city || "N/A"}</td>

                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleViewDocs(item)}
                  >
                    View Docs
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openRequestModal(item._id)}
                  >
                    Request
                  </button>
                </td>

                <td>
                  <span
                    style={{
                      color:
                        item.status === "accepted"
                          ? "green"
                          : item.status === "rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "600",
                    }}
                  >
                    {item.status || "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FRONTEND PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination-container mt-3 d-flex justify-content-center">
          <button
            className="btn btn-light me-2"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {visiblePages.map((page) => (
            <button
              key={page}
              className={`btn me-2 ${
                currentPage === page ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-light"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <ViewDocumentation
        show={showDocs}
        onHide={() => setShowDocs(false)}
        docs={docsData}
      />

      <RequestModal
        show={showRequestModal}
        onHide={() => setShowRequestModal(false)}
        onResult={handleRequestResult}
      />
    </div>
  );
};

export default ContractorTable;
