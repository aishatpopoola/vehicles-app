import React from 'react';
import PropTypes from 'prop-types';

const options = [
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
];

const VehicleForm = ({ submitHandler, values, setValues }) => {
  const handleSubmit = e => {
    e.preventDefault();
    submitHandler();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group titleInputDiv mb-10">
        <input
          type="text"
          className="form-control w-full"
          id="maker"
          name="name"
          maxLength="255"
          placeholder="Vehicle Maker"
          value={values.maker}
          onChange={e => setValues({ ...values, maker: e.target.value })}
          required
        />
      </div>
      <div className="form-group titleInputDiv mb-10">
        <input
          type="text"
          className="form-control w-full"
          id="vehicle-model"
          name="model"
          maxLength="255"
          placeholder="Model"
          value={values.model}
          onChange={e => setValues({ ...values, model: e.target.value })}
          required
        />
      </div>
      <div className="form-group titleInputDiv mb-10">
        <label htmlFor="year">
          Year
          <sup>*</sup>
          <select
            className="formControl w_full mt_10"
            id="year"
            name="year"
            onChange={e => setValues({ ...values, year: e.target.value })}
            required
          >
            <option value={values.year}>{values.year || 'Enter Year'}</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group titleInputDiv mb-10">
        <input
          type="text"
          className="form-control w-full"
          id="license-plate"
          maxLength="20"
          name="license_plate"
          placeholder="License Plate"
          value={values.license_plate}
          onChange={e => setValues({ ...values, license_plate: e.target.value })
          }
          required
        />
      </div>
      <div className="my-10">
        <input
          type="submit"
          value="submit"
          className="btn d-block btn-primary w-full mx-auto"
        />
      </div>
    </form>
  );
};

VehicleForm.propTypes = {
  values: PropTypes.shape({
    vehicle_id: PropTypes.string,
    maker: PropTypes.string,
    year: PropTypes.number,
    model: PropTypes.string,
    license_plate: PropTypes.string,
  }),
  setValues: PropTypes.func,
  submitHandler: PropTypes.func,
};

export default VehicleForm;
