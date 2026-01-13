// import React, { useState } from "react";
// import "../Subscribers.css";

// const SubscribersEmployerTable = () => {
//   // ----------------------------------------
//   // 🔹 PAGINATION DUMMY DATA
//   // ----------------------------------------
//   const sampleData = Array.from({ length: 40 }).map((_, i) => ({
//     id: i + 1,
//     subscriberName: `Subscriber ${i + 1}`,
//     planName: i % 2 === 0 ? "Gold" : "Silver",
//     startDate: "2025-01-10",
//     endDate: "2025-04-10",
//     price: i % 2 === 0 ? "$120" : "$80",
//     paymentStatus: i % 3 === 0 ? "Paid" : i % 3 === 1 ? "Pending" : "Failed",
//   }));

//   // ----------------------------------------
//   // 🔹 PAGINATION LOGIC
//   // ----------------------------------------
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;
//   const totalPages = Math.ceil(sampleData.length / rowsPerPage);

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = sampleData.slice(indexOfFirstRow, indexOfLastRow);

//   let startPage = Math.max(1, currentPage - 1);
//   let endPage = Math.min(startPage + 2, totalPages);
//   if (endPage - startPage < 2) startPage = Math.max(1, endPage - 2);

//   const visiblePages = [];
//   for (let i = startPage; i <= endPage; i++) visiblePages.push(i);

//   const goToPage = (p) => setCurrentPage(p);
//   const nextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
//   const previousPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

//   return (
//     <div className="container p-0 mt-4">
//       <div className="table-responsive table-container shadow-sm">
//         <table className="table table-bordered table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Sr No</th>
//               <th>Subscriber Name</th>
//               <th>Plan Name</th>
//               <th>Plan Start Date</th>
//               <th>Plan End Date</th>
//               <th>Price</th>
//               <th>Payment Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentRows.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{indexOfFirstRow + index + 1}</td>
//                 <td>{item.subscriberName}</td>
//                 <td>{item.planName}</td>
//                 <td>{item.startDate}</td>
//                 <td>{item.endDate}</td>
//                 <td>{item.price}</td>
//                 <td
//                   style={{
//                     color:
//                       item.paymentStatus === "Paid"
//                         ? "green"
//                         : item.paymentStatus === "Pending"
//                         ? "orange"
//                         : "red",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {item.paymentStatus}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
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
//     </div>
//   );
// };

// export default SubscribersEmployerTable;



import React, { useEffect, useState } from "react";
import "../Subscribers.css";
import { getSubscribersEmployerAPI } from "../../../utils/APIs/subscribersApis";
import Loader from "../../../Template/Loader/Loader";


const SubscribersEmployerTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Backend Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getSubscribers = async (page) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("TokenForHireRooferAdmin");
      const response = await getSubscribersEmployerAPI(token, page);
      setLoading(false);

      if (response?.data?.success) {
        setTableData(response.data.data.items || []);
        setTotalPages(response.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubscribers(currentPage);
  }, [currentPage]);

  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const previousPage = () =>
    currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <>
    {loading && <Loader />}
    <div className="container p-0 mt-4">
      <div className="table-responsive table-container shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>Subscriber Name</th>
              <th>Plan Name</th>
              <th>Plan Start Date</th>
              <th>Plan End Date</th>
              <th>Price</th>
              <th>Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.subscriberId}>
                <td>{(currentPage - 1) * 10 + (index + 1)}</td>
                <td>{item.subscriberName}</td>
                <td>{item.planName}</td>
                <td>{new Date(item.planStartDate).toLocaleDateString()}</td>
                <td>{new Date(item.planEndDate).toLocaleDateString()}</td>
                <td>${item.price}</td>
                <td
                  style={{
                    color:
                      item.paymentStatus === "paid"
                        ? "green"
                        : item.paymentStatus === "pending"
                        ? "orange"
                        : "red",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {item.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container mt-3 d-flex justify-content-center">
          <button
            className="btn btn-light me-2"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
    </div>
    </>
  );
};

export default SubscribersEmployerTable;
