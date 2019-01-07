import React from 'react';
import ChipStatus from '~/ui/commons/ChipStatus';
import get from 'lodash/get';

const statusStyles = {
  0: {
    label: 'resources.customers.status.rejected',
    bg: '#FCE4D7',
    tc: '#E0344B',
  },
  1: {
    label: 'resources.customers.status.approved',
    bg: '#4BA839',
    tc: '#FFFFFF',
  },
  2: {
    label: 'resources.customers.status.pending',
    bg: '#E2F4DF',
    tc: '#4BA839',
  },
  3: {
    label: 'resources.customers.status.blocked',
    bg: 'rgba(255, 228, 1, 0.8)',
    tc: '#795548',
  },
};

const VehicleChipStatus = ({ source, record }) => (
  <ChipStatus statusStyles={statusStyles} statusCode={get(record, source)} />
);

export default VehicleChipStatus;
