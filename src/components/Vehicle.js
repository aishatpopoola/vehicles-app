import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const Vehicle = ({
  match: {
    params: { id },
  },
}) => {
  const [vehicle, setVehicle] = useState({
    vehicle_id: '', maker: '', model: '', year: null, license_number: '',
  });
  const [error, setError] = useState(false);
  const history = useHistory();
  const fetchVehicleData = () => {
    Axios.get(`get-vehicles/${id}`)
      .then(res => {
        setVehicle(res.data.vehicle);
        setError(false);
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 404') {
          history.push('/not-found');
        }
        setError(true);
      });
  };
  useEffect(() => {
    fetchVehicleData();
  }, []);
  return (
  <div>
      <div className={`p-10 ${error ? 'd-block' : 'd-none'}`}>
        <p>An Error occured while fetching the data, Please check your network and try again</p>
      </div>
      {vehicle ? (
        <h2>{vehicle.maker}</h2>
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
