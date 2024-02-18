import { useAuth } from "../contexts/auth"
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
  const {logoutUser} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    logoutUser();
  }

  return (
    <>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#logoutModal"
      >
        Launch demo modal
      </button> */}

      <div
        className="modal fade"
        tabIndex="-1"
        id="logoutModal"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-3 shadow bg-secondary text-light">
            <div className="modal-body p-4 text-center">
              <h5 className="mb-0">Are you sure you want to logout?</h5>
            </div>
            <div className="modal-footer flex-nowrap p-0">
              <button
                type="button"
                className="btn btn-lg btn-link text-light fs-6 text-decoration-none col-6 py-3 m-0 rounded-0"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-lg btn-link text-light fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
                onClick={handleLogout}
                data-bs-dismiss="modal"
              >
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
