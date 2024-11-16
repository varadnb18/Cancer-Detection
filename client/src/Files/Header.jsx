import React from "react";
import "./Styles.css";
const Header = () => {
  return (
    <div className="list-container">
      <div className="list">
        <p id="heading">
          <span>M</span>Medimoor
        </p>
      </div>
      <div className="list1">
        <ul>
          <li>
            <a href="#" className="nav-link">
              <b>Home</b>
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Find a Doctor
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              App
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Testimonials
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              About us
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
