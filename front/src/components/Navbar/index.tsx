import { NavLink } from "react-router-dom";
import "./styles.css";

const texto = "<TodoList />";

const Navbar = () => {
  return (
    <nav>
      <div>
        <NavLink to="/">{texto}</NavLink>
      </div>
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
