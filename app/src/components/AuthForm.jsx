import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { FaLock, FaRegUser } from "react-icons/fa";
const url = "/api/auth/login";
const initialUser = { email: "", password: "" };

export default function AuthForm() {
  const { storeAuthInLS } = useAuth();
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setUser({ ...user, [fieldName]: fieldValue });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const res = await toast.promise(axios.post(url, user), {
        pending: "Login in progress",
      });
      if (res.status === 200) {
        toast.success("Login successfully", {
          hideProgressBar: true,
        });
        storeAuthInLS(res.data.token, res.data.role);
        setUser(initialUser);
        navigate(`/${res.data.role}`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.dismiss();
        toast.error(error.response.data.extraDetails);
      } else {
        toast.error("Server is down please try again later");
        // console.log(error);
      }
    }
  };

  return (
    <div className="mycontainer min-vh-100">
      <div className="screen">
        <div className="screen__content min-vh-100">
          <form className="login" onSubmit={handleOnSubmit}>
            <div className="login__field">
              <FaRegUser />
              <input
                type="text"
                className="login__input"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="login__field">
            <FaLock />
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleOnChange}
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right" />
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4 d-none d-md-block" />
          <span className="screen__background__shape screen__background__shape3 d-none d-md-block" />
          <span className="screen__background__shape screen__background__shape2 d-none d-sm-block" />
          <span className="screen__background__shape screen__background__shape1" />
        </div>
      </div>
    </div>
  );
}
