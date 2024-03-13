import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md bg-light navbar-light sticky-top">
        <div className="container-fluid">
          {/* Link to HomePage */}
          <Link
            to="/"
            className="navbar-brand text-primary fw-bold custom-mr-n2"
          >
            HomeHunter
          </Link>
          {/* Menu toggle button for smaller screens under 768px */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="collapsibleNavbar"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* Link to HomePage */}
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {/* Link to PropertySearchPage */}
                <Link className="nav-link" to="/property-search">
                  Property Search
                </Link>
              </li>
              <li className="nav-item">
                {/* Link to FavoriteListPage */}
                <Link className="nav-link" to="/favorite-list">
                  Favorite List
                </Link>
              </li>
              <li className="nav-item">
                {/* Link to SignInPage */}
                <Link className="nav-link" to="/sign-in">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
