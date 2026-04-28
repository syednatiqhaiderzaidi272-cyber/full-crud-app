import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, PlusCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate("/")}>
        <ShoppingBag size={26} />
        <span>ProductHub</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <ShoppingBag size={18} /> Products
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <PlusCircle size={18} /> Add Product
        </NavLink>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
