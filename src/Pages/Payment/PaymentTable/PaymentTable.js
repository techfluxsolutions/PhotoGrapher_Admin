import React from "react";
import "./PaymentTable.css";

const PaymentTable = ({ data }) => {
  return (
    <div className="quote-table-wrapper">
      <table className="quote-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Booking ID</th>
            <th>Invoice ID</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Pending Amount</th>
            <th>Invoice</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.bookingId}</td>
              <td>{item.invoiceId}</td>
              <td>{item.totalAmount}</td>
              <td>{item.paidAmount}</td>
              {/* <td>{item.pendingAmount}</td> */}
                <td>
                {item.invoiceUrl ? (
                  <a
                    href={item.invoiceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="download-btn"
                  >
                    ⬇
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                <button className="download-btn">⬇</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
