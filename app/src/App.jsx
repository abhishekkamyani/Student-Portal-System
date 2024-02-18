import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, redirect, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/auth";
import LogoutModal from "./components/LogoutModal";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import AddCourse from "./pages/AddCourse";
import Courses from "./pages/Courses";
import DropCourse from "./pages/DropCourse";
import AdminWelcome from "./pages/AdminWelcome";
import AdminCourses from "./pages/AdminCourses";
import AdminStudents from "./pages/AdminStudents";
import AdminAddStudent from "./pages/AdminAddStudent";
import AdminSpecificCourse from "./pages/AdminSpecificCourse";
import Login from "./pages/Login";
import Profile from "./Profile";
import Page404 from "./pages/Page404";
import { useEffect } from "react";
import Footer from "./components/Footer";

function App() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let userRouter;

  if (auth?.role === "admin") {
    userRouter = (
      <Route
        path="/admin/*"
        element={
          <>
            <AdminDashboard />
            <Routes>
              <Route path="/" element={<AdminWelcome />} />
              <Route path="/courses" element={<AdminCourses />} />
              <Route path="/students" element={<AdminStudents />} />
              <Route path="/add-student" element={<AdminAddStudent />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/specific-course"
                element={<AdminSpecificCourse />}
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </>
        }
      />
    );

  } else if (auth?.role === "student") {
    userRouter = (
      <Route
        path="/student/*"
        element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/drop-course" element={<DropCourse />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
          </>
        }
      />
    );
  } else {
    userRouter = <Route path="/" element={<Login />} />;
  }

  useEffect(() => {
    if (auth.role === 'admin' && pathname === '/') {
      navigate("/admin");
    }
    else if (auth.role === 'student' && pathname === '/') {
      navigate("/student");
    }
  }, [auth.role])


  return (
    <>
      <LogoutModal />
      <Routes>
        {userRouter}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
