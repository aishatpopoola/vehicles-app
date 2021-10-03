import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Modal from './Modal';
import VehicleForm from './VehicleForm';

const AddVehicle = ({ alert, setVehicles, vehicles }) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [values, setValues] = useState({
    vehicle_id: '', maker: '', model: '', year: '', license_plate: '',
  });

  const handleSubmit = () => {
    const header = { headers: { 'Content-Type': 'application/json' } };
    Axios.post('add-vehicle', values, header)
      .then(res => {
        setVehicles(vehicles.concat(res.data.vehicle));
        setValues({
          vehicle_id: '', maker: '', model: '', year: '', license_plate: '',
        });
        alert({ type: 'd-block alert-success', message: 'Vehicle Successfully added' });
      })
      .catch(e => {
        if (e.message === 'Request failed with status code 422') {
          alert({ type: 'd-block alert-danger', message: 'License plate taken' });
        } else {
          alert({ type: 'd-block alert-danger', message: 'An Error occured while adding the vehicle, Please check your network and try again' });
        }
      });
    setModalDisplay(false);
  };
  const closeModalHandler = () => setModalDisplay(false);
  return (
    <div className="p-10 mt-10 mb-10">
    <div>
      <button
        type="button"
        className="open-modal-button btn pointer btn-primary"
        onClick={() => setModalDisplay(true)}
      >
        Add Vehicle
      </button>
        <Modal
          modalId="add-company-modal"
          modalDisplay={modalDisplay}
          closeModal={closeModalHandler}
          modalTitle="Add Company"
        >
        <VehicleForm
          submitHandler={handleSubmit}
          values={values}
          setValues={setValues}
        />
      </Modal>
    </div>
  </div>
  );
};

AddVehicle.propTypes = {
  alert: PropTypes.func.isRequired,
  setVehicles: PropTypes.func.isRequired,
  vehicles: PropTypes.arrayOf(PropTypes.object),
};

export default AddVehicle;
