import { NavLink } from "react-router-dom";
import { useAuth } from "../context/loginContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { isLogged, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>Termékek listázása</NavLink>

      {isLogged && (<NavLink to="/form" className={({ isActive }) => isActive ? styles.active : styles.link}>Termék hozzáadása</NavLink>)}

      {!isLogged ? (<NavLink to="/login" className={({ isActive }) => isActive ? styles.active : styles.link}>Bejelentkezés</NavLink>) : (<button className={styles.logoutBtn} onClick={logout}>Kijelentkezés</button>)}</nav>
  );
};

export default NavBar;
