import React from "react";
import "./BookingsTable.css";

const BookingsTable = ({ data }) => {
  return (
    <div className="table-wrapper">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Shoot ID</th>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Assigned Photographer</th>
            <th>Team / Studio</th>
            <th>Shoot Type</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Chat</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="10" className="no-data">
                No bookings found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.shootId}>
                <td>{index + 1}</td>
                <td>{item.shootId}</td>
                <td>{item.clientId}</td>
                <td>{item.clientName}</td>
                <td>{item.photographer}</td>
                <td>{item.studio}</td>
                <td>{item.shootType}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.notes || "-"}</td>
                <td>
                  <span className="chat-icon">💬</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
