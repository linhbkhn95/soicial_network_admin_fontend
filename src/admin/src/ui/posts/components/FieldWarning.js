import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { checkIfValidated } from '~/utils';
import { models } from 'data-generator';
import compose from 'recompose/compose';
import { translate as translateDeco } from 'react-admin';
const styles = {
  avatar: {
    marginRight: 10,
  },
  pictureContainer: {
    position: 'relative',
  },
  statusInd: {
    position: 'absolute',
    bottom: -1,
    right: 9,
  },
};

const FieldWarning = ({ classes, record, resource, translate }) => {
  const messagesCompanyDate = checkIfValidated(
    record[models.vehicle.companyExpireDate],
    resource,
    'companyContract',
    translate,
  );
  const messagesCertification = checkIfValidated(
    record[models.vehicle.certificationExpireDate],
    resource,
    'certification',
    translate,
  );
  const messagesInsurance = checkIfValidated(
    record[models.vehicle.insuranceExpireDate],
    resource,
    'insurance',
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

  return (
    <div className="d-flex flex-row align-items-center">
      {warningMessage.length > 0 && (
        <Tooltip title={warningMessage.join('. ')}>
          <i
            style={{ color: '#FFE401', marginLeft: 10, fontSize: 20 }}
            className="fas fa-exclamation-circle"
          />
        </Tooltip>
      )}
      {errorMessage.length > 0 && (
        <Tooltip title={errorMessage.join('. ')}>
          <i
            style={{ color: '#E0344B', marginLeft: 10, fontSize: 20 }}
            className="fas fa-exclamation-triangle"
          />
        </Tooltip>
      )}
    </div>
  );
};
export default compose(
  withStyles(styles),
  translateDeco,
)(FieldWarning);
