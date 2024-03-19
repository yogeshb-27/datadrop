import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      logout(); // from context
      toast.success("Log out successful");
      // alert("Logout successful");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <NavLink
          className="navbar-brand fs-4 d-inline-flex align-items-center"
          to="/"
        >
          {/* <i className="bx bxl-dropbox text-primary me-2"></i> */}
          <i className="bx bxs-data text-primary me-2"></i>
          <span className="fs-5 display-1 text-primary"> DataDrop</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav fs-6 ms-lg-5 ps-lg-5">
            <NavLink
              className={({ isActive }) =>
                `nav-link me-5 ps-lg-3 ${isActive ? "text-primary" : ""}`
              }
              aria-current="page"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link me-5 ps-lg-3 ${isActive ? "text-primary" : ""}`
              }
              aria-current="page"
              to="/about"
            >
              About
            </NavLink>

            {token && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link me-5 ps-lg-3 ${isActive ? "text-primary" : ""}`
                  }
                  aria-current="page"
                  to="/upload"
                >
                  Upload
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link me-5 ps-lg-3 ${isActive ? "text-primary" : ""}`
                  }
                  aria-current="page"
                  to="/files"
                >
                  Files
                </NavLink>
              </>
            )}
          </div>

          {token ? (
            <>
              <button
                className={`nav-link text-danger me-5 my-1 `}
                onClick={handleLogOut}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `nav-link text-secondary me-5  py-1  ${
                    isActive ? "d-none" : ""
                  }`
                }
                to="/login"
              >
                LogIn
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `nav-link text-secondary me-5 py-1 ${
                    isActive ? "d-none" : ""
                  }`
                }
                to="/register"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
