import React, { useEffect, useState } from "react";
import "./ProjectTable.css";
import { getProjectsrAPI } from "../../../utils/APIs/projectsApis";
import Loader from "../../../Template/Loader/Loader";


const ProjectTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const getProjects = async (page) => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("TokenForHireRooferAdmin");
      const response = await getProjectsrAPI(token, page); // <-- send page parameter
      setLoading(false);

      if (response?.data?.success) {
        setTableData(response.data.data.items);
        setTotalPages(response.data.data.pagination.totalPages);
      }

    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects(currentPage);
  }, [currentPage]);


  const goToPage = (p) => setCurrentPage(p);
  const nextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const previousPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);


  return (
    <>
    {loading && <Loader />}
    <div className="container mt-4">
      <div className="table-responsive table-container shadow-sm">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>Project Name</th>
              <th>Contractor Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Number of Roofers</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((item, index) => (
              <tr key={item._id}>
                <td>{(currentPage - 1) * 10 + (index + 1)}</td>
                <td>{item.projectName}</td>
                <td>{item.contractorName}</td>
                <td>{item.email}</td>
                <td>
                  {item.location
                    ? `${item?.location?.street}, ${item?.location?.city}, ${item?.location?.country}`
                    : "N/A"}
                </td>
                <td>{item.numberOfRoofers}</td>
                <td>{`${item.duration} Days`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Pagination */}
      <div className="pagination-container mt-3 d-flex justify-content-center">
        <button
          className="btn btn-light me-2"
          disabled={currentPage === 1}
          onClick={previousPage}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`btn me-2 ${currentPage === page ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="btn btn-light"
          disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>

    </div>
    </>
  );
};

export default ProjectTable;
