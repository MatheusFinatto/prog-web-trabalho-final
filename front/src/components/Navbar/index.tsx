import { NavLink } from "react-router-dom";
import "./styles.css";
import { useUserContext } from "../../contexts/UserContext";

const texto = "<TodoList />";

const Navbar = () => {
  const { user, logout } = useUserContext();
  return (
    <nav>
      <div>
        <NavLink to="/">{texto}</NavLink>
      </div>
      {user.username ? (
        <div>
          <span onClick={logout} style={{ cursor: "pointer", color: "white" }}>
            Logout
          </span>
        </div>
      ) : (
        <div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
