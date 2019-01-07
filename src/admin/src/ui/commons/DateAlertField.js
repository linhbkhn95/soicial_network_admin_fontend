import React from 'react';
import { translate as translateDeco } from 'react-admin';
import { checkIfValidated } from '~/utils';
import AlertTooltip from '~/ui/commons/AlertTooltip';
import get from 'lodash/get';
import DateField from './DateField';

const DateAlertField = ({
  record,
  source,
  resource,
  outdatedMsg,
  soonOutdatedMsg,
  translate,
  ...rest
}) => {
  const value = get(record, source);
  const allMessages = checkIfValidated(value, resource, source, translate);
  let alertType = null;
  let message = null;
  if (allMessages.error.length > 0) {
    message = outdatedMsg || allMessages.error[0];
    alertType = 'error';
  } else if (allMessages.warning.length > 0) {
    message = soonOutdatedMsg || allMessages.warning[0];
    alertType = 'warning';
  }

  return (
    <div style={{ display: 'flex' }}>
      <DateField locales="vi" record={record} source={source} {...rest} />
      {alertType ? <AlertTooltip message={message} type={alertType} /> : ''}
    </div>
  );
};

export default translateDeco(DateAlertField);
