import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const {user} = useContext(AuthContext);
  console.log(user.displayName);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/request'>Friend Request</NavLink>
            </li>
            <li>
              <NavLink>Friend Recommendation</NavLink>
            </li>
          </ul>
        </div>
        <a className="text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal gap-8 px-1">
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "text-green-400 font-semibold border-solid border-b-2 border-green-400 py-1"
                  : "text-black";
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/request'
              className={({ isActive }) => {
                return isActive
                  ? "text-green-400 font-semibold border-solid border-b-2 border-green-400 py-1"
                  : "text-black";
              }}
            >
              Friend Request
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "text-green-400 font-semibold border-solid border-b-2 border-green-400 py-1"
                  : "text-black";
              }}
            >
              Friend Recommendation
            </NavLink>
          </li>
        </ul>
      </div>
      <p>{user.email}</p>
      <div className="navbar-end">
        <Link to="/login">
          <button className="btn btn-outline rounded-full btn-sm">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
