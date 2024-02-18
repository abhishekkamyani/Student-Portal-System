import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { toast } from "react-toastify";
const url = "/api/auth/register/student";
const initialData = {
  cmsID: "",
  firstName: "",
  lastName: "",
  address: "",
  gender: "",
  city: "",
  phoneNumber: "",
  email: "",
  password: "",
  program: "",
};

export default function AdminAddStudent() {
  const [student, setStudent] = useState(initialData);
  const { postDataToAPI } = useAuth();

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setStudent({ ...student, [fieldName]: fieldValue });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const res = await toast.promise(postDataToAPI(url, student), {
        pending: "Registration in process",
      });
      if (res.status === 201) {
        toast.success("Registration successfully");
        handleOnReset();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleOnReset = () => {
    setStudent(initialData);
  };

  return (
    <>
      <section className="h-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card card-registration my-4"
                style={{ background: "var(--light-color)" }}
              >
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo"
                      className="img-fluid"
                      style={{
                        borderTopLeftRadius: ".25rem",
                        borderBottomLeftRadius: ".25rem",
                      }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <form
                      onSubmit={handleOnSubmit}
                      className="card-body p-md-5 text-light"
                    >
                      <h3 className="mb-5 text-uppercase">Add a new Student</h3>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1mName"
                              className="form-control form-control-lg"
                              placeholder="Abhishek"
                              name="firstName"
                              value={student.firstName}
                              onChange={handleOnChange}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1mform3Example1mName"
                            >
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="lastName"
                              className="form-control form-control-lg"
                              placeholder="Kumar"
                              name="lastName"
                              value={student.lastName}
                              onChange={handleOnChange}
                              required
                            />
                            <label className="form-label" htmlFor="lastName">
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="city"
                              className="form-control form-control-lg"
                              placeholder="Islamabad"
                              name="city"
                              value={student.city}
                              onChange={handleOnChange}
                              required
                            />
                            <label className="form-label" htmlFor="city">
                              City
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example8"
                              className="form-control form-control-lg"
                              placeholder="1st Floor Kutchery Bazar Punjab"
                              name="address"
                              value={student.address}
                              onChange={handleOnChange}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example8"
                            >
                              Address
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender: </h6>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="maleGender"
                            name="gender"
                            value="male"
                            onChange={handleOnChange}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="femaleGender"
                            name="gender"
                            value="female"
                            onChange={handleOnChange}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>
                        <div className="form-check form-check-inline mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="otherGender"
                            name="gender"
                            value="other"
                            onChange={handleOnChange}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="otherGender"
                          >
                            Other
                          </label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="cmsID"
                              className="form-control  form-control-lg"
                              placeholder="023-21-03xx"
                              name="cmsID"
                              value={student.cmsID}
                              onChange={handleOnChange}
                              required
                            />
                            <label className="form-label" htmlFor="cmsID">
                              CMS ID
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <select
                            className="select py-2 rounded d-block w-100"
                            id="program"
                            name="program"
                            value={student.program}
                            onChange={handleOnChange}
                            required
                          >
                            <option value="">[--Select--]</option>
                            <option value="bscs">BSCS</option>
                            <option value="bba">BBA</option>
                            <option value="accountings">Accountings</option>
                            <option value="finance">Finance</option>
                            <option value="engineering">Engineering</option>
                          </select>
                          <label htmlFor="program" className="form-label">
                            Program
                          </label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-7 mb-4">
                          <div className="form-outline">
                            <input
                              type="email"
                              id="form3Example1m"
                              className="form-control  form-control-lg"
                              name="email"
                              value={student.email}
                              onChange={handleOnChange}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              Email ID
                            </label>
                          </div>
                        </div>
                        <div className="col-md-5 mb-4">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                              name="password"
                              value={student.password}
                              onChange={handleOnChange}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1n"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          className="btn btn-light btn-lg"
                          onClick={handleOnReset}
                        >
                          Reset all
                        </button>
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                        >
                          Submit form
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
