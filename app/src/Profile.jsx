import { useAuth } from "./contexts/auth";
import { capitalizeEveryFirstChar, capitalizeFirstChar } from "./utilis";

export default function Profile() {
  const { userData, auth } = useAuth();

  let avatarUrl = "/avatars/female.png";
  if (auth.role === "admin") {
    avatarUrl = "https://bootdey.com/img/Content/avatar/avatar7.png"
  }
  else if (userData.gender === "male") {
    avatarUrl = "/avatars/male.png";
  }

  return (
    <div className="container">
      <div
        className="main-body my-5 py-5"
        style={{ backgroundColor: "var(--light-color)" }}
      >
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="text-light" style={{ backgroundColor: "unset" }}>
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={avatarUrl}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                  <div className="mt-3">
                    <h4 className="fw-bold">{capitalizeEveryFirstChar(userData.firstName + " " + userData.lastName)}</h4>
                    <p className="text-light mb-1">{auth.role === "student" ? (userData.program + '').toUpperCase() : capitalizeFirstChar(auth.role)}</p>
                    <p className="text-light font-size-sm">{userData.cmsID || userData.adminID}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div
              className="card mb-3 text-light"
              style={{ backgroundColor: "unset" }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0 fw-bolder">Email</h6>
                  </div>
                  <div className="col-sm-9 text-light">{userData.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0 fw-bolder">
                      {auth.role === "admin" ? "Admin" : "CMS"}-ID
                    </h6>
                  </div>
                  <div className="col-sm-9 text-light">
                    {userData.adminID || userData.cmsID}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0 fw-bolder">{auth.role === "admin" ? "Role" : "Program"}</h6>
                  </div>
                  <div className="col-sm-9 text-light">{auth.role === "admin" ? capitalizeFirstChar(auth.role) : (userData.program + '').toUpperCase()}</div>
                </div>
                {auth.role === "student" && (
                  <>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">City</h6>
                      </div>
                      <div className="col-sm-9 text-light">{capitalizeFirstChar(userData.city)}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Address</h6>
                      </div>
                      <div className="col-sm-9 text-light">
                        {capitalizeEveryFirstChar(userData.address)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
