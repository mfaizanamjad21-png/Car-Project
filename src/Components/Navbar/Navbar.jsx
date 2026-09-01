import { Link } from "react-router-dom";
import "./Navbar.css";
<Link to="/garage">Garage</Link>

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          CarHub
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/garage">Garage</Link>
        <Link to="/compare">Compare</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/fuel">Fuel Calculator</Link>
      </nav>

      <button
        onClick={() => document.body.classList.toggle("dark")}
        className="dark-toggle"
      >
        🌙
      </button>
    </header>
  );
}
