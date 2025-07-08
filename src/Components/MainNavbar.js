import { NavLink } from "react-router-dom";
import "../Css/MainNavbar.css";
 
const tabs = [
  { path: "/student-profile", label: "Student Profile" },
  { path: "/payments", label: "Payments" },
  { path: "/transport", label: "Transport" },
  { path: "/academics", label: "Academics" },
  { path: "/alerts", label: "Alerts" },
  { path: "/history", label: "History" },
  { path: "/room-allotment", label: "Room Allotment" },
  { path: "/issue-forms", label: "Issue Forms" },
  { path: "/certificates", label: "Certificates" },
];
 
const MainNavbar = () => {
  return (
    <div
      className="main-navbar d-flex justify-content-center align-items-center flex-wrap shadow-sm p-1 mb-3"
      style={{ gap: "10px" }}
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `nav-tab px-3 py-2 ${isActive ? "active-tab" : "text-dark"}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
};
 
export default MainNavbar;