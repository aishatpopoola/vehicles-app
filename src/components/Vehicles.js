import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const fetchVehicleData = () => {
    Axios.get('get-vehicles')
      .then(res => {
        console.log(res);
        setVehicles(res.data.vehicles);
      });
  };
  useEffect(() => {
    fetchVehicleData();
  }, []);
  return (
  <div>
    <h2>Vehicles</h2>
    <h1 className="ta-center">All Companies</h1>
      {vehicles.length >= 1 ? (
        vehicles.map(vehicle => (
          <NavLink to={`/vehicle/${vehicle.vehicle_id}`} key={vehicle.id}>
            <a className="single d-flex w-full justify-between p-10">
              <span>
                <b>{`${vehicle.maker}  ${vehicle.model}`}</b>
              </span>
              <button
                className=" btn btn-danger"
                type="submit"
              >
                Delete
              </button>
            </a>
          </NavLink>
        ))
      ) : (
        <div className="ta-center p-10 mt-10 bg-white">
          Vehicles list is empty. Add a Vehicle.
        </div>
      )}
  </div>
  );
};

export default Vehicles;
