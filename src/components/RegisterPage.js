import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <div>
        <h3 className="text-center mt-5">Register</h3>
        <p className="text-center">
          Already registered? {" "}
          {/* Link to SignInPage */}
          <Link to="/sign-in" className="text-dark">
            Sign in
          </Link>
        </p>
        <hr />
        <form className="d-flex flex-column align-items-center my-5">
          <div class="mb-3 w-50">
            <label for="email" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3 w-50">
            <label for="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div class="mb-3 form-check w-50">
            <input type="checkbox" className="form-check-input" id="checkbox" />
            <label className="form-check-label" for="checkbox">
              Sign up to newsletter
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-50">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
