import React from 'react';
import AvatarStatus from '~/ui/commons/AvatarStatus';
import { models } from 'data-generator';
import { checkIfValidated } from '~/utils';
import { translate } from 'react-admin';
import get from 'lodash/get';
import { getStatus } from '~/utils/statusUtils';

const PlateAvatarStatus = ({
  dataPath,
  record,
  picSource,
  statusSource,
  textSrc,
  resource,
  translate,
  type,
  source,
}) => {
  const dataRecord = (dataPath && get(record, dataPath)) || record || {};
  const messagesCompanyDate = checkIfValidated(
    dataRecord[models.vehicle.companyExpireDate],
    resource,
    'companyContract',
    translate,
  );
  const messagesCertification = checkIfValidated(
    dataRecord[models.vehicle.certificationExpireDate],
    resource,
    'certification',
    translate,
  );
  const messagesInsurance = checkIfValidated(
    dataRecord[models.vehicle.insuranceExpireDate],
    resource,
    'insurance',
    translate,
  );
  const warningMessage = [
    ...messagesCompanyDate.warning,
    ...messagesInsurance.warning,
    ...messagesCertification,
  ];
  const errorMessage = [
    ...messagesCompanyDate.error,
    ...messagesInsurance.error,
    ...messagesCertification.error,
  ];

  let driverStatus = get(record, 'status');
  let vehicle = get(record, 'vehicle');
  let documentStatus = get(record, 'document_status');
  let statusCode = getStatus(documentStatus, driverStatus);
  let online_status = get(record, statusSource);
  if (statusCode == 5 && !vehicle) return <div />;
  return (
    <AvatarStatus
      warningMessage={warningMessage}
      errorMessage={errorMessage}
      picSource={picSource}
      record={dataRecord}
      online_status={online_status}
      statusSource={statusSource}
      textSrc={textSrc}
      type={type}
    />
  );
};

export default translate(PlateAvatarStatus);
