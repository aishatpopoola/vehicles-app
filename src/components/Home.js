import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => (
  <div>
    <h1 className={'title ta-center my-10' }>Welcome to VeTrack<small style={{ fontSize: 8 }}>Your No1 car tracking APP</small></h1>
      <article className="bg-white p-10">
        <p className='title p-10'>
          Track Your fleet of cars or trucks with VETRACK
          <br />
          <br />
          Built with React On The Frontend and Laravel on the backend
        </p>
        <NavLink to="/vehicles">
          <a className="btn btn-primary d-block my-10 mx-auto">Show Existing Vehicles</a>
        </NavLink>
      </article>
  </div>
);

export default Home;
