import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Modal from './Modal';
import VehicleForm from './VehicleForm';

const AddVehicle = ({ alert, setVehicles, vehicles }) => {
  // this is where we set the modal state. by default it is false.
  const [modalDisplay, setModalDisplay] = useState(false);

  // here we are setting the values we need to create or update a vehicle data
  const [values, setValues] = useState({
    vehicle_id: '', maker: '', model: '', year: '', license_plate: '',
  });

  // this is the function that creates/adds a new vehicle
  const handleSubmit = () => {
    // this is to set the config headers
    const header = { headers: { 'Content-Type': 'application/json' } };

    // this send the requests to the add-vehicle endpoint
    Axios.post('add-vehicle', values, header)
      .then(res => {

        // the requests succeeds so we want to update the vehicles array passed to this component
        setVehicles(vehicles.concat(res.data.vehicle));

        // then we are settings all the form values back to null states
        setValues({
          vehicle_id: '', maker: '', model: '', year: '', license_plate: '',
        });

        // the an alert is set to show that the vehicle had been created
        alert({ type: 'd-block alert-success', message: 'Vehicle Successfully added' });
      })
      .catch(e => {

        // here the requests fails and we want to check if its a validation
        if (e.message === 'Request failed with status code 422') {

          // if it is we want to let the user know that they have inputed a license plate that has already been taken
          alert({ type: 'd-block alert-danger', message: 'License plate taken' });
        } else {

          // if its not a validation error the it's other error like network error so we want to set the alert to show an error occurred
          alert({ type: 'd-block alert-danger', message: 'An Error occured while adding the vehicle, Please check your network and try again' });
        }
      });

      // in all case we want to remove the modal
    setModalDisplay(false);
  };

  // this function sets removes the modal

  const closeModalHandler = () => setModalDisplay(false);
  return (
    <div className="p-10 mt-10 mb-10">
    <div>
      <button
        type="button"
        className="open-modal-button btn pointer btn-primary"
        onClick={() => setModalDisplay(true)} // this functions open's the modal
      >
        Add Vehicle
      </button>
        <Modal
          modalId="add-vehicle-modal"
          modalDisplay={modalDisplay}
          closeModal={closeModalHandler}
          modalTitle="Add Vehicle"
        >
          {/** here we are actually passing the vehicle form as a child to the modal component */}
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
