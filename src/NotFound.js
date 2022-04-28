import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404</h2>
            <p>Sorry, page not found</p>
            <Link to="/">Back home</Link>
        </div>
    );
}

export default NotFound;