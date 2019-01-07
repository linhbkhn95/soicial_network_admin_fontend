import React, { Fragment } from 'react';
import _ from 'lodash';

const InfoField = ({ record, source }) => (
  <Fragment>
    <span
      style={{
        width: 16,
        height: 16,
        backgroundColor: '#FBFBFB',
        border: '1.6px solid rgba(32, 48, 72, 0.6)',
        borderRadius: 4,
        display: 'inline-block',
        marginRight: 12,
        marginBottom: -6,
      }}
    />{' '}
    {_.get(record, source)}
  </Fragment>
);

export default InfoField;
