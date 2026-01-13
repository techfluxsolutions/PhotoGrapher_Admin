// import React, { useState } from "react";
// import "./SubscriptionPlansEmployer.css";

// const SubscriptionPlansEmployer = () => {
//   const [plans, setPlans] = useState([
//     {
//       id: 1,
//       planName: "Basic Plan",
//       price: "49",
//     },
//     {
//       id: 2,
//       planName: "Silver Plan",
//       price: "79",
//     },
//     {
//       id: 3,
//       planName: "Gold Plan",
//       price: "119",
//     },
//   ]);

//   const handleChange = (index, key, value) => {
//     const updatedPlans = [...plans];
//     updatedPlans[index][key] = value;
//     setPlans(updatedPlans);
//   };

//   const handleSave = () => {
//     console.log("Updated Plans:", plans);
//     alert("Subscription plans updated successfully!");
//   };

//   return (
//     <div className="container mt-4">

//       <div className="row mt-4">
//         {plans.map((plan, index) => (
//           <div className="col-md-4 mb-4" key={plan.id}>
//             <div className="card shadow-sm plan-card">
//               <div className="card-body">

//                 <label className="form-label fw-bold">Plan Name</label>
//                 <input
//                   type="text"
//                   className="form-control mb-3"
//                   value={plan.planName}
//                   onChange={(e) => handleChange(index, "planName", e.target.value)}
//                 />

//                 <label className="form-label fw-bold">Plan Price ($)</label>
//                 <input
//                   type="number"
//                   className="form-control mb-3"
//                   value={plan.price}
//                   onChange={(e) => handleChange(index, "price", e.target.value)}
//                 />

//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={handleSave}
//                 >
//                   Update Plan
//                 </button>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPlansEmployer;



import React, { useState, useEffect } from "react";
import "./SubscriptionPlansEmployer.css";
import {
  getSubscriptionEmployerAPI,
  patchSubscriptionEmployerAPI,
} from "../../../utils/APIs/subscriptionPlansApis";
import Loader from "../../../Template/Loader/Loader";
import { toast } from "react-toastify";

const SubscriptionPlansEmployer = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("TokenForHireRooferAdmin");

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await getSubscriptionEmployerAPI(token);
      if (response?.data?.data) {
        setPlans(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch plans");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (index, key, value) => {
    const updated = [...plans];
    updated[index][key] = value;
    setPlans(updated);
  };

  const handleSave = async (plan) => {
    setLoading(true);
    try {
      const body = {
        planName: plan.planName,
        price: plan.price,
      };

      const response = await patchSubscriptionEmployerAPI(token, plan._id, body);

      if (response?.data?.success) {
        toast.success(response.data.message || "Plan updated successfully!");
      } else {
        toast.error("Something went wrong!");
      }

      fetchPlans();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating plan");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      {loading && <Loader />}

      <div className="row mt-4">
        {plans?.map((plan, index) => (
          <div className="col-md-4 mb-4" key={plan._id}>
            <div className="card shadow-sm plan-card">
              <div className="card-body">

                <label className="form-label fw-bold">Plan Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={plan.planName}
                  onChange={(e) => handleChange(index, "planName", e.target.value)}
                />

                <label className="form-label fw-bold">Plan Price ($)</label>
                <input
                  type="number"
                  className="form-control mb-3"
                  value={plan.price}
                  onChange={(e) => handleChange(index, "price", e.target.value)}
                />

                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleSave(plan)}
                >
                  Update Plan
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlansEmployer;
