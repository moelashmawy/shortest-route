import { Link, Outlet } from "react-router-dom";
import "./style.css";

export function LayoutPage() {
  return (
    <div>
      <nav className="navbar">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/about">About</Link>
        </span>
      </nav>

      <Outlet />
    </div>
  );
}
