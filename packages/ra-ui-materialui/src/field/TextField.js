import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';
import translate from 'ra-core';

import sanitizeRestProps from './sanitizeRestProps';

const TextField = ({
  className,
  source,
  prefix,
  suffix,
  record = {},
  sourceData,
  ...rest
}) => {
  const finalSource = sourceData || source;
  const value = record && finalSource ? get(record, finalSource) : rest.value;
  return (
    <Typography
      component="span"
      body1="body1"
      className={className}
      {...sanitizeRestProps(rest)}
    >
      {`${prefix || ''}${
        value !== undefined && value !== null ? value : ''
      }${suffix || ''}`}
    </Typography>
  );
};

TextField.propTypes = {
  addLabel: PropTypes.bool,
  basePath: PropTypes.string,
  className: PropTypes.string,
  cellClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  label: PropTypes.string,
  record: PropTypes.object,
  sortBy: PropTypes.string,
  source: PropTypes.string.isRequired,
};

const PureTextField = pure(TextField);

PureTextField.defaultProps = {
  addLabel: true,
};

export default PureTextField;
