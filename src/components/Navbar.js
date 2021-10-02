import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <header className="bb-block bg-white">
    <nav className="d-flex justify-between mx-auto align-center">
      <div className="brand ml-10">
        <NavLink to="/">
          <b>VeTrack</b>
        </NavLink>
      </div>
      <ul className="d-flex mr-10">
        <li className="d-flex justify-center align-center mr-10">
          <NavLink to="/vehicles">Vehicles</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
