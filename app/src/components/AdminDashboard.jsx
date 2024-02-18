import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useAuth } from "../contexts/auth";

export default function AdminDashboard(params) {
  const menuBarRef = useRef(null);
  const onClickMenu = () => {
    menuBarRef.current.classList.toggle("open");
  };

  const activeMenuBar = ({ isActive, isPending }) =>
    isActive ? "active-link-dashboard" : "";

  const { storeAuthInLS } = useAuth();

  return (
    <div className="adminDashboard">
      <ul className="menu">
        <li title="home">
          <a
            className="menu-button home nav-clr"
            onClick={onClickMenu}
            style={{ cursor: "pointer" }}
          >
            menu
          </a>
        </li>
        <li className="d-flex align-items-center h-xs-100 float-end float-sm-none">
          <p
            className="vertical-text text-dark pe-2 px-sm-0 mx-auto py-sm-5 my-auto my-md-0"
            style={{
              textIndent: "0em",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            ADMIN'DASHBOARD
          </p>
        </li>
      </ul>
      <ul className="menu-bar" ref={menuBarRef}>
        <li>
          <NavLink to={""} className="menu-button nav-clr">
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/courses" className={activeMenuBar}>
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/students" className={activeMenuBar}>
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/add-student" className={activeMenuBar}>
            Add Student
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/specific-course" className={activeMenuBar}>
            Specific course
          </NavLink>
          <NavLink to="/admin/profile" className={activeMenuBar}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link">
            <div data-bs-toggle="modal" data-bs-target="#logoutModal">
              Logout
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
