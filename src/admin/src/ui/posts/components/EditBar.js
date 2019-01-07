import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import IconDeleteButton from '~/ui/commons/Buttons/IconDeleteButton';
import SwitchStatus from '~/ui/commons/SwitchStatus';
import { Link } from 'react-router-dom';
import { linkToRecord } from 'react-admin';
// import { models } from 'data-generator';
// import { capitalizeFirstLetter } from '~/utils';
import { getCompanyInfo, getIdentity } from '~/store/selectors';
import { connect } from 'react-redux';
// const STATE_APPROVED = 0;
import { getStatus } from '~/utils/statusUtils';
import get from 'lodash/get';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    margin: theme.spacing.unit,
  },
});

const IconEditButton = ({ basePath = '', record = {}, ...rest }) => (
  <IconButton component={Link} to={linkToRecord(basePath, record.id)} {...rest}>
    <EditIcon fontSize="small" />
  </IconButton>
);

@connect(state => ({
  companyInfo: getCompanyInfo(state),
  user: getIdentity(state),
}))
@withStyles(styles)
export default class EditBar extends React.Component {
  render() {
    const { props } = this;
    let {
      toggleStatusSrc,
      classes,
      record = {},
      basePath,
      basePathSwitch,
      resource,
      hasDelete,
      hasEdit,
      hasSwitch,
      switchDisabled,
      editDisabled,
      deleteDisabled,
      user,
      // hasDialogConfirm,
    } = props;
    let driverStatus = get(record, 'status');
    let jugnoo_id = get(record, 'jugnoo_id');
    let documentStatus = get(record, 'document_status');
    let statusCode = getStatus(documentStatus, driverStatus);
    return (
      <div className={classes.root}>
        {hasSwitch &&
          String(user.id) !== String(record.id) && (
            <SwitchStatus
              {...props}
              statusSrc={toggleStatusSrc}
              resource={resource}
              record={record}
              id={record.id}
              basePath={basePathSwitch ? basePathSwitch : basePath}
              disabled={switchDisabled}
              meta={{
                ON: 1,
                OFF: 0,
              }}
            />
          )}
        {hasEdit && (
          <IconEditButton
            record={record}
            basePath={basePath}
            disabled={editDisabled}
          />
        )}
        {hasDelete &&
          statusCode == 5 &&
          jugnoo_id == null && (
            <IconDeleteButton
              record={record}
              basePath={basePath}
              resource={resource}
              disabled={deleteDisabled}
            />
          )}
      </div>
    );
  }
}
