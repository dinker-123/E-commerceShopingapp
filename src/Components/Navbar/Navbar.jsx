import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "../../Icons/house-chimney.png";
import OrdersIcon from "../../Icons/ballot.png";
import CartIcon from "../../Icons/shopping-cart.png";
import SignOutIcon from "../../Icons/exit.png";
import SignInIcon from "../../Icons/enter.png";
import styles from "./Navbar.module.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutThunk,
  userSelector,
  userActions,
} from "../../store/reducers/userReducer";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  console.log(navigate);
  const { user, signOutSuccess } = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (signOutSuccess) {
      navigate("/buybusy");
      dispatch(userActions.setSignOutSuccess(false));
    }
  }, [signOutSuccess, dispatch, navigate]);

  const handleSignOut = () => {
    dispatch(signOutThunk())
      .then(() => {
        localStorage.removeItem("uid");
        dispatch(userActions.setUser(null));
        toast.success("Logged out successfully!");
      })
      .catch((error) => toast.error(error.code));
  };

  return (
    <>
      <div className={styles.Navbar}>
        <NavLink
          className={styles.navLogo}
          style={({ isActive }) => {
            return {
              color: isActive ? "#7064e5" : "black",
            };
          }}
          to="/buybusy"
        >
          Buy Busy
        </NavLink>
        <ul className={styles.navMenu}>
          <li className={styles.navOption}>
            <NavLink
              end
              to="/buybusy"
              className={styles.navLink}
              style={({ isActive }) => {
                return {
                  color: isActive ? "#7064e5" : "black",
                };
              }}
            >
              <img
                className={styles.navIcon}
                src={HomeIcon}
                alt="home button"
              />
              Home
            </NavLink>
          </li>
          {user ? (
            <>
              <li className={styles.navOption}>
                <NavLink
                  to="/buybusy/myorders"
                  className={styles.navLink}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#7064e5" : "black",
                    };
                  }}
                >
                  <img
                    className={styles.navIcon}
                    src={OrdersIcon}
                    alt="orders icon"
                  />
                  My Orders
                </NavLink>
              </li>
              <li className={styles.navOption}>
                <NavLink
                  to="/buybusy/cart"
                  className={styles.navLink}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#7064e5" : "black",
                    };
                  }}
                >
                  <img
                    src={CartIcon}
                    className={styles.navIcon}
                    alt="cart icon"
                  />
                  Cart
                </NavLink>
              </li>
              <li className={styles.navOption} onClick={handleSignOut}>
                <NavLink
                  end
                  className={styles.navLink}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#7064e5" : "black",
                    };
                  }}
                >
                  <img
                    src={SignOutIcon}
                    className={styles.navIcon}
                    alt="sign out icon"
                  />
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <li className={styles.navOption}>
              <NavLink
                end
                to="/buybusy/signin"
                className={styles.navLink}
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#7064e5" : "black",
                  };
                }}
              >
                <img
                  src={SignInIcon}
                  className={styles.navIcon}
                  alt="sign in icon"
                />
                Sign In
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
