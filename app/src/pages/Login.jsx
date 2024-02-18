import AuthForm from "../components/AuthForm";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <>
      <nav className="navbar navbar-dark nav-clr">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 py-2 fw-bold">Student Portal System</span>
        </div>
      </nav>
      <AuthForm />
      <Footer />
    </>
  );
}
