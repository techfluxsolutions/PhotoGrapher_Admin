// import React, { useState } from "react";
// import "./SubscriptionPlansContractor.css";

// const SubscriptionPlansContractor = () => {
//   const [boosters, setBoosters] = useState([
//     {
//       id: 1,
//       boosterName: "Boost Profile (3 Days)",
//       days: "3",
//       price: "10",
//     },
//     {
//       id: 2,
//       boosterName: "Boost Profile (7 Days)",
//       days: "7",
//       price: "20",
//     },
//     {
//       id: 3,
//       boosterName: "Boost Profile (30 Days)",
//       days: "30",
//       price: "50",
//     },
//   ]);

//   const handleChange = (index, key, value) => {
//     const updatedBoosters = [...boosters];
//     updatedBoosters[index][key] = value;
//     setBoosters(updatedBoosters);
//   };

//   const handleSave = () => {
//     console.log("Updated Booster Plans:", boosters);
//     alert("Contractor Boost Plans Updated Successfully!");
//   };

//   return (
//     <div className="container mt-4">

//       <div className="row">
//         {boosters.map((boost, index) => (
//           <div className="col-md-4 mb-4" key={boost.id}>
//             <div className="card shadow-sm boost-card">
//               <div className="card-body">

//                 <label className="form-label fw-bold">Booster Name</label>
//                 <input
//                   type="text"
//                   className="form-control mb-3"
//                   value={boost.boosterName}
//                   onChange={(e) =>
//                     handleChange(index, "boosterName", e.target.value)
//                   }
//                 />

//                 <label className="form-label fw-bold">Boost Duration (Days)</label>
//                 <input
//                   type="number"
//                   className="form-control mb-3"
//                   value={boost.days}
//                   onChange={(e) => handleChange(index, "days", e.target.value)}
//                 />

//                 <label className="form-label fw-bold">Price ($)</label>
//                 <input
//                   type="number"
//                   className="form-control mb-3"
//                   value={boost.price}
//                   onChange={(e) => handleChange(index, "price", e.target.value)}
//                 />

//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={handleSave}
//                 >
//                   Update Booster Plan
//                 </button>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPlansContractor;



import React, { useState, useEffect } from "react";
import "./SubscriptionPlansContractor.css";
import {
  getSubscriptionContractorAPI,
  patchSubscriptionContractorAPI,
} from "../../../utils/APIs/subscriptionPlansApis";
import Loader from "../../../Template/Loader/Loader";
import { toast } from "react-toastify";

const SubscriptionPlansContractor = () => {
  const [boosters, setBoosters] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("TokenForHireRooferAdmin");

  // ================= Fetch Booster Plans =================
  const fetchBoosters = async () => {
    setLoading(true);
    try {
      const response = await getSubscriptionContractorAPI(token);
      if (response?.data?.data) {
        setBoosters(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch booster plans");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBoosters();
  }, []);

  // ================= Input Change Handler =================
  const handleChange = (index, key, value) => {
    const updated = [...boosters];
    updated[index][key] = value;
    setBoosters(updated);
  };

  // ================= PATCH API (Update Booster) =================
  const handleSave = async (boost) => {
    setLoading(true);
    try {
      const body = {
        boosterName: boost.planName,
        boostDuration: boost.boostDuration,
        price: boost.price,
      };

      const response = await patchSubscriptionContractorAPI(
        token,
        boost._id,
        body
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Something went wrong!");
      }

      fetchBoosters();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating booster");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      {loading && <Loader />}

      <div className="row">
        {boosters?.map((boost, index) => (
          <div className="col-md-4 mb-4" key={boost._id}>
            <div className="card shadow-sm boost-card">
              <div className="card-body">

                {/* Booster Name */}
                <label className="form-label fw-bold">Booster Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={boost.planName}
                  onChange={(e) =>
                    handleChange(index, "planName", e.target.value)
                  }
                />

                {/* Booster Duration */}
                <label className="form-label fw-bold">
                  Boost Duration (Days)
                </label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={boost.boostDuration}
                  onChange={(e) =>
                    handleChange(index, "boostDuration", e.target.value)
                  }
                />

                {/* Booster Price */}
                <label className="form-label fw-bold">Price ($)</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={boost.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />

                {/* Save Button */}
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleSave(boost)}
                >
                  Update Booster Plan
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlansContractor;
