import React, { useEffect, useState } from "react";
import { Link, useInRouterContext, useNavigate } from "react-router-dom";
import './navbar.css';

export const Navbar = (props) => {
  let nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setLogin(false);
    nav('/login')
  };


  useEffect(() => {
    checkStorage();
    return () => {};
  }, [props.login]);
  function checkStorage() {
    if (localStorage.getItem("token")) {
      props.setLogin(true);
    } else {
      props.setLogin(false);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light navbar-static">
        <div className="container-fluid">
          <a className="navbar-brand">
          <Link to="/">
            <img src="/LAS-YUCAS.png" />
            </Link>
          </a>
          <div className="navbar-right" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <div className="nav-link active">
                    <button className="btn btn-success">Home</button>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/menu">
                  <div className="nav-link active">
                    <button className="btn btn-success">Menu</button>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                {!props.login ? (
                  <Link to="/login">
                    <div className="nav-link active">
                      <button className="btn btn-success">Login</button>
                    </div>
                  </Link>
                ) : (
                  <div className="nav-link active">
                    <button className="btn btn-success" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </li>

              <li className="nav-item">
                {props.login ? (
                  <Link to="/cart">
                    <div className="nav-link active">
                      <button className="btn btn-success">
                        {props.count > 0 ? (
                          <div>
                            <img src="/cart-fill.svg" />

                            <span
                              className="badge badge-primary"
                              color="primary"
                            >
                              {props.count}
                            </span>
                          </div>
                        ) : (
                          <img src="/cart-fill.svg" />
                        )}
                      </button>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
