import React from 'react';
import ChipStatus from '~/ui/commons/ChipStatus';
import get from 'lodash/get';
import { getStatus } from '~/utils/statusUtils';

const statusStyles = {
  0: {
    label: 'resources.drivers.status.rejected',
    bg: '#FCE4D7',
    tc: '#E0344B',
  },
  1: {
    label: 'resources.drivers.status.approved',
    bg: '#E2F4DF',
    tc: '#4BA839',
  },
  2: {
    label: 'resources.drivers.status.pending',
    bg: '#F2FFFF',
    tc: '#006DBA',
  },
  3: {
    label: 'resources.drivers.status.blocked',
    bg: '#E0344B',
    tc: '#FFFFFF',
  },
  4: {
    label: 'resources.drivers.status.noVehicle',
    bg: 'rgba(255, 187, 0, 0.2)',
    tc: '#540808',
  },
  5: {
    label: 'resources.drivers.status.new',
    bg: '#FFD6F2',
    tc: '#8A2199',
  },
};
const VehicleChipStatus = ({ source, record }) => {
  let driver = get(record, 'driver'); //

  let driverStatus = driver ? get(driver, 'status') : 1;
  let documentStatus = driver ? get(driver, 'document_status') : 1;
  let statusCode = getStatus(documentStatus, driverStatus);
  // console.log(documentStatus, driverStatus);
  return <ChipStatus statusStyles={statusStyles} statusCode={statusCode} />;
};

export default VehicleChipStatus;
