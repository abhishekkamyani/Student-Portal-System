import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../contexts/auth";
import { Link } from "react-router-dom";

export default function Footer() {
  const { auth } = useAuth();
  let homeUrl = "/";
  if (auth.role === 'admin') {
    homeUrl = "/admin";
  }
  else if (auth.role === 'student') {
    homeUrl = "/student";
  }
  return (
    <div className="container-fluid nav-clr">
      <footer className="d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center py-3 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to={homeUrl}
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src="/favicons/favicon-32x32.png" />
          </Link>
          <h6 className="mb-3 mb-md-0 text-light fw-bold">
            © {new Date().getFullYear()} Developed By Abhishek Kumar
          </h6>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex mx-3">
          <li className="ms-3">
            <a className="fs-5 text-light" href="https://github.com/abhishekkamyani" target="_blank">
              <FaGithub />
            </a>
          </li>
          <li className="ms-3">
            <a className="fs-5 text-light" href="https://www.linkedin.com/in/abhishek-kumar-web-developer" target="_blank">
              <FaLinkedin />
            </a>
          </li>
          <li className="ms-3">
            <a className="fs-5 text-light" href=" https://wa.me/qr/VEY3V5TWLLWHC1" target="_blank">
              <FaWhatsapp />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
