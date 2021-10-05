import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import AddVehicle from './AddVehicle';

const Vehicles = () => {

  // This sets the vehicles list state
  const [vehicles, setVehicles] = useState([]);

  // this sets an alert state to show alert when an action is being done
  const [alert, setAlert] = useState({ type: '', message: '' });

  // this function is use to fetch all vehicles data from database
  const fetchVehicleData = () => {
    Axios.get('get-vehicles')
      .then(res => {
        // this populates the vehicles gotten from database to the vehicles variable above
        setVehicles(res.data.vehicles);
      })
      .catch(() => {
        // if the requests fails we want to set the alert to show up
        setAlert({ type: 'd-block alert-danger', message: 'An Error occured while fetching the data, Please check your network and try again' });
      });
  };

  // we are setting this to get the vehicles data whenever the page is rendered or rerendered
  useEffect(() => {
    fetchVehicleData();
  }, []);

  // this is the function to close the alert by setting the alert to its original state
  const closeAlert = () => {
    setAlert({ type: '', message: '' });
  };

  // this functions is used to delete a vehicle using the vehicle_id
  const handleDelete = id => {
    Axios.delete(`delete-vehicle/${id}`)
      .then(() => {
        // on success we want to alert the user that the data has been deleted
        setAlert({ type: 'd-block alert-success', message: 'Vehicle Successfully deleted' });

        // this sets the vehicles data to remove the vehicle with that particular vehicle_id
        setVehicles(
          vehicles.filter(vehicle => vehicle.vehicle_id !== id),
        );
      })
      .catch(() => {
        // if the request fails this set an alert to show that the request was unsuccessful
        setAlert({ type: 'd-block alert-danger', message: 'An Error occured while deleting the data, Please check your network and try again' });
      });
  };
  return (
    <div>
      <div className={`p-10 alert ${!alert.type ? 'd-none' : alert.type}`}>
        <p className="d-flex justify-between">
           {alert.message} <span onClick={closeAlert} className="pointer">X</span>
        </p>
      </div>

      {/** 
       * this is the component that pops the modal with the add vehicle form 
       * we are passing the setAlert and setVehicle functions as props and vehicle data
       * */}
      <AddVehicle alert={setAlert} setVehicles={setVehicles} vehicles={vehicles}/>


      <h1 className="text-center">All Vehicles</h1>
      {vehicles.length >= 1 ? (  // this checks if there is a data in vericles array
        [...vehicles].reverse().map(vehicle => (
          
          // this links to the single vehicle 
          <NavLink
            to={`/vehicle/${vehicle.vehicle_id}`} 
            key={vehicle.vehicle_id}
            className="single d-flex w-full justify-between p-10"
          >
            <span>
              <b>{`${vehicle.maker}  ${vehicle.model}`}</b>
            </span>
            <button
              className="btn btn-danger pointer"
              type="submit"
              style={{ borderRadius: '50%' }}
              onClick={e => {
                e.preventDefault();
                handleDelete(vehicle.vehicle_id);
              }}
            >
              X
            </button>
          </NavLink>
        ))
      ) : ( // we show that the vehicls are empty so we  show that the lists is empty
        <div className="ta-center p-10 mt-10 bg-white">
          Vehicles list is empty. Add a Vehicle.
        </div>
      )}
    </div>
  );
};

export default Vehicles;
