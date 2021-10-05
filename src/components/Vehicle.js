import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import VehicleForm from './VehicleForm';

const Vehicle = ({
  match: {
    params: { id },
  },
}) => {

  // here we are setting the single vehicle state in a vehicle object
  const [vehicle, setVehicle] = useState({
    vehicle_id: '', maker: '', model: '', year: '', license_plate: '',
  });

  // this sets an alert state to show alert when an action is being done
  const [alert, setAlert] = useState({ type: '', message: '' });

  const history = useHistory(); // this hook helps get the browser history


  // this function gets the vehicle data with the api endpoint
  const fetchVehicleData = () => {
    Axios.get(`get-vehicles/${id}`)
      .then(res => {

        // on success we want to set the vehicle object the object returned from response
        setVehicle(res.data.vehicle);
      })
      .catch(error => {

        // on failure the we want to check if the error is a 404 error
        if (error.message === 'Request failed with status code 404') {

          // this helps redirects the user to 404 page (NotFound page) if the error is 404
          history.push('/not-found');
        }

        // if the error is not 404 the we want to alert the user that an error occurred
        setAlert({ type: 'd-block alert-danger', message: 'An Error occured while fetching the data, Please check your network and try again' });
      });
  };


  // we are setting this to get the vehicle data whenever the page is rendered or rerendered
  useEffect(() => {
    fetchVehicleData();
  }, []);

  // this is the function to close the alert by setting the alert to its original state
  const closeAlert = () => {
    setAlert({ type: '', message: '' });
  };

  // this functions, is used to submit the form to update the vehicle 
  const handleSubmit = () => {
    const header = { headers: { 'Content-Type': 'application/json' } };
    Axios.patch('update-vehicle', vehicle, header)
      .then(res => {

        // on success of updatin vehicle we want to alert the user
        setAlert({ type: 'd-block alert-success', message: res.data.message });
      })
      .catch(() => {

        // on failure of updating vehicle we want to alert the user
        setAlert({ type: 'd-block alert-danger', message: 'An Error occured while fetching the data, Please check your network and try again' });
      });
  };
  return (
  <div>
      <div className={`p-10 alert ${!alert.type ? 'd-none' : alert.type}`}>
        <p className="d-flex justify-between">
           {alert.message} <span onClick={closeAlert} className="pointer">X</span>
        </p>
      </div>
      {vehicle ? (
        <>
          <h2 className="text-center my-10 p-10">{`${vehicle.maker} - ${vehicle.model}`}</h2>
          {/** here is the component we called for the vehicle form */}
          <VehicleForm
            submitHandler={handleSubmit}
            values={vehicle}
            setValues={setVehicle}
          />
        </>
      ) : (
        <p className="p-10 m-10 text-center">Getting Vehicle data...</p>
      )}
  </div>
  );
};

Vehicle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Vehicle;
