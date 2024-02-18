import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export default function Page404() {
    const {auth} = useAuth();

    let toUrl = "/";
    if (auth?.role === "admin") {
        toUrl = "/admin";
    }
    else if(auth?.role === "student"){
        toUrl = "/student";
    }
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>
                    The page you are looking for might have been removed had its name changed
                    or is temporarily unavailable.
                </p>
                <Link to={toUrl}>Go To Homepage</Link>
            </div>
        </div>

    );
}