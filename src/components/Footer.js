import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-secondary text-light p-5 mt-4">
      {/* Link to HomePage */}
      <Link className="text-decoration-none text-light" to="/">
        <h4 className="fw-bold mb-3">HomeHunter</h4>
      </Link>
      {/* Link to PropertySearchPage */}
      <Link className="text-decoration-none text-light" to="/property-search">
        <p>Search homes for sale</p>
      </Link>
      {/* Link to PropertySearchPage */}
      <Link className="text-decoration-none text-light" to="/property-search">
        <p>Search homes for rent</p>
      </Link>
      {/* Link to PropertySearchPage */}
      <Link className="text-decoration-none text-light" to="/property-search">
        <p>Search house prices</p>
      </Link>
      {/* Link to PropertySearchPage */}
      <Link className="text-decoration-none text-light" to="/property-search">
        <p>View lastest properties</p>
      </Link>
      {/* Link to PropertySearchPage */}
      <Link className="text-decoration-none text-light" to="/sign-in">
        <p>Sign in / Create account</p>
      </Link>
      <p className="fw-bold">Privacy</p>
      <p className="fw-bold">Cookies</p>
      <p className="fw-bold">Terms</p>
      <p className="fw-bold">About HomeHunter</p>
    </div>
  );
}

export default Footer;
