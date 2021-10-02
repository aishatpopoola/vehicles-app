import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
  <div>
      <h2>This page cannot be found</h2>
      <p>
        Go back
        {' '}
        <NavLink to="/">
          <a>Home</a>
        </NavLink>
      </p>
  </div>
);

export default NotFound;
