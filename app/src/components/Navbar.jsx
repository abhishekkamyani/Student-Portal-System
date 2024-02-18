import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-clr">
      <div className="container-fluid py-2">
        <NavLink className="navbar-brand" to="/student">
          Student Portal
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/student">
                Courses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/student/add-course">
                Add course
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/student/drop-course">
                Drop course
              </NavLink>
            </li>
            <li className="nav-item d-lg-none">
              <NavLink className="nav-link" to="/student/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item d-lg-none">
              <div className="nav-link" style={{ cursor: "pointer" }}>
                <div data-bs-toggle="modal" data-bs-target="#logoutModal">
                  {" "}
                  Logout
                </div>
              </div>
            </li>

            <li className="nav-item dropdown d-none d-lg-block text-end ms-2">
              <a
                href="#"
                className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle className="fs-2" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end text-small">
                <li>
                  <NavLink className="dropdown-item" to="/student/profile">
                    Profile
                  </NavLink>
                </li>
                <li>
                </li>
                <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#logoutModal" style={{ cursor: "pointer" }}>
                  Logout
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
