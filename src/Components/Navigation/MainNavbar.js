import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Logout from "../Logout";
import "./navbar.css";

const MainNavbar = () => {
  const location = useLocation();

  // display none for missing links
  const missingLinks = document.querySelector(".main_read_share");
  if (missingLinks === "") {
    missingLinks.style.display = "none";
  }

  // remove active class from active link
  useEffect(() => {
    const activeLink = document.querySelector(".active");
    if (activeLink) {
      activeLink.classList.remove("active");
      activeLink.classList.add("activated");
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <header className="main_navbar">
      <nav>
        <ul>
          {/* home page */}
          <li className="main_navbar_list">
            <NavLink to="/" className="main_link">
              Home
            </NavLink>
          </li>

          {/* about page */}
          <li className="main_navbar_list">
            <NavLink to="/about" className="main_link">
              About
            </NavLink>
          </li>

          {/* read stories page */}
          <li className="main_navbar_list">
            <NavLink to="/read" className="main_link">
              Read
            </NavLink>
          </li>

          {/* share stories page */}
          <li className="main_navbar_list">
            <NavLink to="/share" className="main_link">
              Share
            </NavLink>
          </li>
          <li className="main_navbar_list">
            <NavLink to="/profile" className="main_link">
              Profile
            </NavLink>
          </li>

          {/* logout page */}
          <li className="main_navbar_list">
            <Logout />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavbar;
