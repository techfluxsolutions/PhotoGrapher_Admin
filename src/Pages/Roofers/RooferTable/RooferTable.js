import React, { useState } from "react";
import "./RooferTable.css";
import ViewDocumentation from "../ViewDocumentation/ViewDocumentation";
import RequestModal from "../RequestModal/RequestModal";

const RooferTable = () => {
  const [showDocs, setShowDocs] = useState(false);
  const [docsData, setDocsData] = useState([]);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Default all rows → Pending
  const [rowStatus, setRowStatus] = useState({
    1: "pending",
    2: "pending",
  });

  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      location: "New York",
      documents: ["/docs/doc1.png", "/docs/doc2.png", "/docs/doc3.png"],
    },
    {
      id: 2,
      name: "Alex Smith",
      email: "alex@example.com",
      location: "California",
      documents: ["/docs/alex1.png", "/docs/alex2.png"],
    },
  ];

  const handleViewDocs = (docs) => {
    setDocsData(docs);
    setShowDocs(true);
  };

  const openRequestModal = (rowId) => {
    setSelectedRow(rowId);
    setShowRequestModal(true);
  };

  const handleRequestResult = (result) => {
    setRowStatus((prev) => ({
      ...prev,
      [selectedRow]: result, // update only selected row
    }));
  };

  return (
    <div className="container mt-4">
      <div className="table-responsive table-container shadow-sm">

        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>Roofer Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Documents</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sampleData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.location}</td>

                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleViewDocs(item.documents)}
                  >
                    View Docs
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openRequestModal(item.id)}
                  >
                    Request
                  </button>
                </td>

                <td>
                  {rowStatus[item.id] === "pending" && (
                    <span style={{ color: "orange", fontWeight: "600" }}>
                      Pending
                    </span>
                  )}

                  {rowStatus[item.id] === "accepted" && (
                    <span style={{ color: "green", fontWeight: "600" }}>
                      Accepted
                    </span>
                  )}

                  {rowStatus[item.id] === "rejected" && (
                    <span style={{ color: "red", fontWeight: "600" }}>
                      Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Documentation Modal */}
      <ViewDocumentation
        show={showDocs}
        onHide={() => setShowDocs(false)}
        docs={docsData}
      />

      {/* Request Modal */}
      <RequestModal
        show={showRequestModal}
        onHide={() => setShowRequestModal(false)}
        onResult={handleRequestResult}
      />
    </div>
  );
};

export default RooferTable;
