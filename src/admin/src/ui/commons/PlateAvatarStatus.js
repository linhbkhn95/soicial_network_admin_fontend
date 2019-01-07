import React from 'react';
import AvatarStatus from '~/ui/commons/AvatarStatus';
import { models } from 'data-generator';
import { translate } from 'react-admin';
import { checkIfValidated } from '~/utils';
import get from 'lodash/get';

const PlateAvatarStatus = ({
  record,
  basePath,
  type,
  picSource,
  statusSource,
  textSrc,
  hasLink,
  linkTo,
  resource,
  translate,
}) => {
  const { warningMessage, errorMessage } = carDateCaveats(
    record,
    resource,
    translate,
  );

  return (
    <AvatarStatus
      warningMessage={warningMessage}
      errorMessage={errorMessage}
      picSource={picSource}
      record={record}
      type={type}
      resource={resource}
      statusSource={statusSource}
      basePath={basePath}
      textSrc={textSrc}
      toPage={hasLink ? 'show' : null}
      linkTo={
        typeof linkTo === 'function' ? linkTo(get(record, textSrc)) : linkTo
      }
    />
  );
};

export default translate(PlateAvatarStatus);

export const carDateCaveats = (record, resource, translate) => {
  const messagesCompanyDate = checkIfValidated(
    record[models.vehicle.companyExpireDate],
    resource,
    models.vehicle.companyExpireDate,
    translate,
  );

  const messagesCertification = checkIfValidated(
    record[models.vehicle.certificationExpireDate],
    resource,
    models.vehicle.certificationExpireDate,
    translate,
  );

  const messagesInsurance = checkIfValidated(
    record[models.vehicle.insuranceExpireDate],
    resource,
    models.vehicle.insuranceExpireDate,
    translate,
  );

  const warningMessage = [
    ...messagesCompanyDate.warning,
    ...messagesInsurance.warning,
    ...messagesCertification.warning,
  ];
  const errorMessage = [
    ...messagesCompanyDate.error,
    ...messagesInsurance.error,
    ...messagesCertification.error,
  ];

  return { warningMessage, errorMessage };
};
