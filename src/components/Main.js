import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => (
  <main className="mx-auto p-10">
      {children}
  </main>
);

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
