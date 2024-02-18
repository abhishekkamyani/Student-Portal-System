import axios from "axios";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
  });
  const [userData, setUserData] = useState({});

  const storeAuthInLS = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
  };

  // note -> need to modify this
  const getUserData = async (token) => {
    const res = await axios.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(res.data);
  };

  useEffect(() => {
    if (auth.token) {
      getUserData(auth.token);
    }
  }, [auth.token]);

  const fetchDataFromAPI = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  const postDataToAPI = async (url, data) => {
    try {
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res;
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.extraDetails);
    }
  };

  const logoutUser = () => {
    toast.dismiss();
    toast.success("Logout successful", { hideProgressBar: true });
    setAuth("");
    setUserData("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        storeAuthInLS,
        userData,
        fetchDataFromAPI,
        postDataToAPI,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
}
