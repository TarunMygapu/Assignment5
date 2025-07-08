import { NavLink } from "react-router-dom";
import "../Css/MainNavbar.css";

const tabs = [
  { path: "/students/studentsprofile", label: "Student Profile" },
  { path: "/students/payments", label: "Payments" },
  { path: "/students/transport", label: "Transport" },
  { path: "/students/academics", label: "Academics" },
  { path: "/students/alerts", label: "Alerts" },
  { path: "/students/history", label: "History" },
  { path: "/students/roomallotment", label: "Room Allotment" },
  { path: "/students/issueforms", label: "Issue Forms" },
  { path: "/students/certificates", label: "Certificates" },
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