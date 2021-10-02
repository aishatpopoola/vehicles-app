import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Modal from './Modal';
import VehicleForm from './VehicleForm';

const AddVehicle = ({ alert }) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const handleSubmit = values => {
    const header = { headers: { 'Content-Type': 'application/json' } };
    Axios.post('add-vehicle', values, header)
      .then(() => {
        alert({ type: 'd-block alert-success', message: 'Vehicle Successfully added' });
      })
      .catch(e => {
        if (e.message === 'Request failed with status code 422') {
          alert({ type: 'd-block alert-danger', message: 'License plate taken' });
        } else {
          alert({ type: 'd-block alert-danger', message: 'An Error occured while fetching the data, Please check your network and try again' });
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
          initialValues={{}}
        />
      </Modal>
    </div>
  </div>
  );
};

AddVehicle.propTypes = {
  alert: PropTypes.func.isRequired,
};

export default AddVehicle;
