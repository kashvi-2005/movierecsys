import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <header
      style={{
        textAlign: "center",
        padding: "20px 0",
        color: "#00008B",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
      }}
    >
      {/* Main Title */}
      <div
        style={{
          overflowX: 'hidden',
          color: "#00008B",
          fontSize: "40px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        MovieRec
      </div>

      {/* Navigation Links */}
      <nav style={{ paddingTop: "15px" }}>
        <div
          style={{
            backgroundColor: "rgba(173, 216, 230, 0.7)",
            padding: "10px 0", 
            display: "inline-block", 
            borderRadius: "10px", 
          }}
        >
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li style={{ margin: "0 15px" }}>
              <Link
                to="/"
                style={{
                  color: location.pathname === "/" ? "#FFF" : "#00008B",
                  textDecoration: "none",
                  fontSize: "28px",
                }}
              >
                Home
              </Link>
            </li>
            <li style={{ margin: "0 15px" }}>
              <Link
                to="/recommend"
                style={{
                  color: location.pathname === "/recommend" ? "#FFF" : "#00008B",
                  textDecoration: "none",
                  fontSize: "28px",
                }}
              >
                Recommend
              </Link>
            </li>
            <li style={{ margin: "0 15px" }}>
              <Link
                to="/How"
                style={{
                  color: location.pathname === "/How" ? "#FFF" : "#00008B",
                  textDecoration: "none",
                  fontSize: "28px",
                }}
              >
                How it works
              </Link>
            </li>
            <li style={{ margin: "0 15px" }}>
              <Link
                to="/about"
                style={{
                  color: location.pathname === "/about" ? "#FFF" : "#00008B",
                  textDecoration: "none",
                  fontSize: "28px",
                }}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
