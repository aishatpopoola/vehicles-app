import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import AddVehicle from './AddVehicle';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  const [alert, setAlert] = useState({ type: '', message: '' });

  const fetchVehicleData = () => {
    Axios.get('get-vehicles')
      .then(res => {
        setVehicles(res.data.vehicles);
      })
      .catch(() => {
        setAlert({ type: 'd-block alert-danger', message: 'An Error occured while fetching the data, Please check your network and try again' });
      });
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const closeAlert = () => {
    setAlert({ type: '', message: '' });
  };
  return (
    <div>
      <div className={`p-10 ${!alert.type ? 'd-none' : alert.type}`}>
        <p className="d-flex justify-between">
           {alert.message} <span onClick={closeAlert}>X</span>
        </p>
      </div>
      <AddVehicle alert={setAlert} />
      <h1 className="ta-center">All Companies</h1>
      {vehicles.length >= 1 ? (
        vehicles.map(vehicle => (
          <NavLink
            to={`/vehicle/${vehicle.vehicle_id}`}
            key={vehicle.id}
            className="single d-flex w-full justify-between p-10"
          >
            <span>
              <b>{`${vehicle.maker}  ${vehicle.model}`}</b>
            </span>
            <button className=" btn btn-danger" type="submit">
              Delete
            </button>
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
