import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "../styles/Header.module.css";
import { ShoppingCart } from "lucide-react";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (event) => {
    event.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleSignout = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/auth/login");
  };
  return (
    <nav className="flex flex-col flex-wrap md:flex-row lg:flex-row gap-2 justify-between items-center my-10 mx-10 px-10 py-2 font-bold bg-white shadow-md rounded-2xl md:sticky md:top-0 md:z-50 lg:sticky top-0 z-50 ">
      <NavLink to="/" onClick={handleLogoClick}>
        <p className={classes.header}>Chill Fit</p>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${classes.navlink} ${isActive ? classes.active : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="products"
        className={({ isActive }) =>
          `${classes.navlink} ${isActive ? classes.active : ""}`
        }
      >
        Products
      </NavLink>
      <NavLink
        to="cart"
        className={({ isActive }) =>
          `${classes.navlink} ${isActive ? classes.active : ""} flex gap-2`
        }
      >
        Cart
        <ShoppingCart />
      </NavLink>
      <NavLink to="/auth/login">
        <button onClick={handleSignout} className="hover:cursor-pointer">Sign out</button>
      </NavLink>
    </nav>
  );
}

export default Header;
