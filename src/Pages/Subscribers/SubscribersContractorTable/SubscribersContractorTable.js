import React, { useState, useEffect } from "react";
import "../Subscribers.css";
import { getSubscribersContractorAPI } from "../../../utils/APIs/subscribersApis";
import Loader from "../../../Template/Loader/Loader";


const SubscribersContractorTable = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // Backend Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const getSubscribersContractor = async (page) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("TokenForHireRooferAdmin");
      const response = await getSubscribersContractorAPI(token, page);
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
    getSubscribersContractor(currentPage);
  }, [currentPage]);


  // Pagination Change Functions
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
                <th>Boost Duration (Days)</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {tableData.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No data found
                  </td>
                </tr>
              )}

              {tableData.map((item, index) => (
                <tr key={item._id}>
                  <td>{(currentPage - 1) * 10 + (index + 1)}</td>
                  <td>{item.subscriberName}</td>
                  <td>{item.boostDuration}</td>
                  <td>{new Date(item.startDate).toLocaleDateString()}</td>
                  <td>{new Date(item.endDate).toLocaleDateString()}</td>
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

export default SubscribersContractorTable;
