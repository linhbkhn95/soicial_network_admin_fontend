import React from 'react';
import PropTypes from 'prop-types';
import AvatarField from './AvatarField';
import pure from 'recompose/pure';

const FullNameField = ({ record = {}, size }) => (
  <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
    <AvatarField record={record} size={size} />
    &nbsp;{record.first_name} {record.last_name}
  </div>
);

FullNameField.propTypes = {
  record: PropTypes.object,
  size: PropTypes.number,
};

const PureFullNameField = pure(FullNameField);

PureFullNameField.defaultProps = {
  source: 'last_name',
  label: 'resources.customers.fields.name',
};

export default PureFullNameField;
