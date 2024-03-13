import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="d-flex flex-column align-items-center bg-dark text-light py-5">
        <h2>Buy or Rent</h2>
        <p>House, Flats, and Rooms</p>
        {/* Link to PropertySearchPage */}
        <Link to="/property-search" className="my-4">
          <button type="button" className="btn btn-primary text-light btn-lg">
            Search For Properties
          </button>
        </Link>
      </div>
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-5 py-5 px-md-5 px-0">
        <div className="text-center w-50">
          <h3>House Prices</h3>
          <p>View the price of recent houses sold.</p>
          {/* Link to PropertySearchPage */}
          <Link to="/property-search">
            <button type="btn" className="btn btn-primary">
              View House Prices
            </button>
          </Link>
        </div>
        <div className="w-50">
          <img
            src="images/image-2.jpg"
            className="img-fluid mx-auto rounded home-img"
            alt="House"
          />
        </div>
      </div>
      <hr />
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-5 py-5 px-md-5 px-0">
        <div className="text-center w-50">
          <h3>Request Agent Validation</h3>
          <p>
            How much is your house worth? <br /> Check now.
          </p>
          <button type="btn" className="btn btn-primary">
            Request Validation
          </button>
        </div>
        <div className="w-50">
          <img
            src="images/image-1.jpg"
            className="img-fluid mx-auto rounded home-img"
            alt="Block of flats"
          />
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center py-5 w-50">
          <div className="bg-dark text-light p-3 p-md-5 rounded">
            <h4>Join the many people who are getting more from there home</h4>
            <p className="py-3">
              With, Logo you can can keep track of the properties you are
              interested in and use our price estimates to help you decide when
              to move.
            </p>
            <div className="d-flex justify-content-center gap-4">
              {/* Link to RegisterPage */}
              <Link to="/register" className="w-50">
                <button type="btn" className="btn btn-primary w-100">
                  Register
                </button>
              </Link>
              {/* Link to SignInPage */}
              <Link to="/sign-in" className="w-50">
                <button type="btn" className="btn btn-light w-100">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
