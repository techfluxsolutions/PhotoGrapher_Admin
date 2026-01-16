// import "./UpcomingBookings.css";

// const UpcomingBookings = () => {
//   const bookings = [
//     {
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 5,
//       status: "Completed",
//       price: "Rs. 7,000/-",
//     },
//     {
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 5,
//       status: "Completed",
//       price: "Rs. 7,000/-",
//     },
//     {
//       title: "Birthday Event",
//       date: "15 Dec, 2025",
//       day: "Monday",
//       rating: 5,
//       status: "Completed",
//       price: "Rs. 7,000/-",
//     },
//   ];

//   return (
//     <div className="upcoming-card">
//       <h3 className="card-title">Upcoming Booking</h3>

//       {bookings.map((item, index) => (
//         <div key={index} className="booking-box">
          
//           {/* Left */}
//           <div className="booking-left">
//             <div className="event-title">
//               🎂 <span>{item.title}</span>
//             </div>

//             <div className="event-date">
//               {item.date} &nbsp;&nbsp; {item.day}
//             </div>

//             <div className="rating-row">
//               <span className="rating-label">Ratings</span>
//               <div className="stars">
//                 {"★".repeat(item.rating)}
//               </div>
//             </div>

//             <div className="action-row">
//               <button className="view-btn">View Details</button>
//               <button className="chat-btn">Chat Now</button>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="booking-right">
//             <span className="status completed">{item.status}</span>
//             <span className="price">{item.price}</span>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default UpcomingBookings;


const UpcomingBookings = () => {
  const bookings = [
    {
      title: "Birthday Event",
      date: "15 Dec, 2025",
      day: "Monday",
      rating: 5,
      status: "Completed",
      price: "Rs. 7,000/-",
    },
    {
      title: "Birthday Event",
      date: "15 Dec, 2025",
      day: "Monday",
      rating: 5,
      status: "Completed",
      price: "Rs. 7,000/-",
    },
    {
      title: "Birthday Event",
      date: "15 Dec, 2025",
      day: "Monday",
      rating: 5,
      status: "Completed",
      price: "Rs. 7,000/-",
    },
  ];

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Upcoming Booking</h5>

        {bookings.map((item, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 d-flex flex-column flex-md-row justify-content-between gap-3"
          >
            {/* Left */}
            <div>
              <div className="fw-semibold mb-1">
                🎂 {item.title}
              </div>

              <div className="text-muted small mb-2">
                {item.date} · {item.day}
              </div>

              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="small text-muted">Ratings</span>
                <span className="text-warning">
                  {"★".repeat(item.rating)}
                </span>
              </div>

              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  View Details
                </button>
                <button className="btn btn-primary btn-sm">
                  Chat Now
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="text-md-end">
              <span className="badge bg-success mb-2">
                {item.status}
              </span>
              <div className="fw-bold mt-2">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
