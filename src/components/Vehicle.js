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
  const [vehicle, setVehicle] = useState({
    vehicle_id: '', maker: '', model: '', year: '', license_plate: '',
  });

  const [alert, setAlert] = useState({ type: '', message: '' });

  const history = useHistory();

  const fetchVehicleData = () => {
    Axios.get(`get-vehicles/${id}`)
      .then(res => {
        setVehicle(res.data.vehicle);
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 404') {
          history.push('/not-found');
        }
        setAlert({ type: 'd-block alert-danger', message: 'An Error occured while fetching the data, Please check your network and try again' });
      });
  };

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const closeAlert = () => {
    setAlert({ type: '', message: '' });
  };
  const handleSubmit = () => {
    const header = { headers: { 'Content-Type': 'application/json' } };
    Axios.patch('update-vehicle', vehicle, header)
      .then(res => {
        setAlert({ type: 'd-block alert-success', message: res.data.message });
      })
      .catch(() => {
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
