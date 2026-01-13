import React from "react";
import { Link, useLocation } from "react-router-dom";

// All icons from react-icons/hi
import {
  HiOutlineViewGrid,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlineInformationCircle,
  HiOutlineLogout,
  HiOutlineUsers,
  HiOutlineCreditCard,
} from "react-icons/hi";

import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <HiOutlineViewGrid size={20} />,
      path: "/dashboard",
    },
    {
      name: "Roofers",
      icon: <HiOutlineOfficeBuilding size={20} />,
      path: "/roofers",
    },
    {
      name: "Subscription Plan",
      icon: <HiOutlineCreditCard size={20} />,
      path: "/subscriptionPlan",
    },
   {
      name: "Subscribers",
      icon: <HiOutlineUsers size={20} />,
      path: "/subscribers",
    }, 
    {
      name: "Projects",
      icon: <HiOutlineBriefcase size={20} />,
      path: "/projects",
    },
    
    
    {
      name: "Logout",
      icon: <HiOutlineLogout size={20} />,
      path: "/logout",
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <ul className="sidebar-menu" style={{ marginTop: "8vh" }}>
        {menuItems.map((item) => (
          <Link to={item.path} key={item.path}>
            <li
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
