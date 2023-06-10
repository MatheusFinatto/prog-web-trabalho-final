import { NavLink } from "react-router-dom";
import "./styles.css";
import TodoList from "../../pages/TodoList/Show";

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
