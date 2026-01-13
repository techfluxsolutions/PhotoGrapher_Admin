// import { useEffect, useState } from "react";
// import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Login from "../AuthModule/Login/Login";
// import Layout from "../Template/LayoutMain/LayoutMain/Layout";
// import InternetChecker from "../utils/InternetChecker/InternetChecker";
// import ScrollToTop from "../utils/scrollToTop/ScrollToTop";

// import About from "../Pages/About/About";
// import Dashboard from "../Pages/Dashboard/Dashboard";
// import Projects from "../Pages/Projects/Projects";
// import Roofers from "../Pages/Roofers/Roofers";
// import Subscribers from "../Pages/Subscribers/Subscribers";
// import SubscriptionPlans from "../Pages/SubscriptionPlans/SubscriptionPlans";

// const AppRoutes = () => {
//   const [isOffline, setIsOffline] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleOffline = () => setIsOffline(true);
//     const handleOnline = () => setIsOffline(false);

//     window.addEventListener("offline", handleOffline);
//     window.addEventListener("online", handleOnline);

//     return () => {
//       window.removeEventListener("offline", handleOffline);
//       window.removeEventListener("online", handleOnline);
//     };
//   }, []);

//   // UPDATED PRIVATE ROUTE (Token + Login Check)
//   const PrivateRoute = ({ children }) => {
//     const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

//     // NEW – check stored token
//     const token = sessionStorage.getItem("TokenForHireRooferAdmin");

//     if (!isLoggedIn || !token) {
//       return <Navigate to="/" replace />;
//     }

//     return children;
//   };

//   return (
//     <>
//       <ScrollToTop />
//       {isOffline && <InternetChecker />}

//       <Routes>
//         {/* Public Route */}
//         <Route path="/" element={<Login />} />

//         {/* Protected Layout Wrapper */}
//         <Route
//           element={
//             <PrivateRoute>
//               <Layout />
//             </PrivateRoute>
//           }
//         >
//           {/* All internal pages here */}
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/roofers" element={<Roofers />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/subscribers" element={<Subscribers />} />
//           <Route path="/subscriptionPlan" element={<SubscriptionPlans />} />
//           <Route path="/about" element={<About />} />
//         </Route>

//         {/* Redirect unknown */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// };

// export default AppRoutes;



import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../AuthModule/Login/Login";
import Layout from "../Template/LayoutMain/LayoutMain/Layout";
import InternetChecker from "../utils/InternetChecker/InternetChecker";
import ScrollToTop from "../utils/scrollToTop/ScrollToTop";

import About from "../Pages/About/About";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Projects from "../Pages/Projects/Projects";
import Roofers from "../Pages/Roofers/Roofers";
import Subscribers from "../Pages/Subscribers/Subscribers";
import SubscriptionPlans from "../Pages/SubscriptionPlans/SubscriptionPlans";

const AppRoutes = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // ✅ UI-ONLY PRIVATE ROUTE
  const PrivateRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <>
      <ScrollToTop />
      {isOffline && <InternetChecker />}

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roofers" element={<Roofers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/subscriptionPlan" element={<SubscriptionPlans />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
