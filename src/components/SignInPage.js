import React from "react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <>
      <div>
        <h3 to="/register" className="text-center mt-5">
          Sign In
        </h3>
        <p className="text-center">
          No account? {" "}
          {/* Link to RegisterPage */}
          <Link to="/register" className="text-dark">
            Register
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
          <div className="mb-5 w-50">
            <label for="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary w-50">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
