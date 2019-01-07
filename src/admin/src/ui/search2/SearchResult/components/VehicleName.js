import React from 'react';

const VehicleName = ({ item }) => (
  <React.Fragment>
    {item ? `${item.mark} ${item.model_code} ${item.manufactured_year}` : '---'}
  </React.Fragment>
);

export default VehicleName;
