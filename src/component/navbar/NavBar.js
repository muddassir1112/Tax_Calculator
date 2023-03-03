import React from "react";
import { Link } from "react-router-dom";
import logo from "../../ClearTax-logo.jpg";

export const NavBar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#0">
            <img src={logo} alt="..." />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link rounded btn--link"
                  aria-current="page"
                  href="#0"
                >
                  Income Details
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/deduction"
                  className="nav-link rounded btn--link"
                  href="#0"
                >
                  Dedcutions
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/summary"
                  className="nav-link btn--link rounded"
                  href="#0"
                >
                  Summary
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <hr></hr>
    </>
  );
};
