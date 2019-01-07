import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
// import EditIcon from '@material-ui/icons/Edit';
import IconDeleteButton from '~/ui/commons/Buttons/IconDeleteButton';
import SwitchStatus from '~/ui/commons/SwitchStatus';
import { Link } from 'react-router-dom';
import { linkToRecord } from 'react-admin';
// import { models } from 'data-generator';
// import { capitalizeFirstLetter } from '~/utils';
import { getCompanyInfo, getIdentity } from '~/store/selectors';
import { connect } from 'react-redux';
// const STATE_APPROVED = 0;

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

const EditIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.8004 7.29778C13.7732 7.27034 13.7408 7.24854 13.7052 7.23364C13.6695 7.21874 13.6313 7.21102 13.5927 7.21094C13.5541 7.21095 13.5158 7.21857 13.4802 7.23337C13.4446 7.24817 13.4122 7.26986 13.3849 7.29719L6.97628 13.7076C6.92128 13.7626 6.89038 13.8372 6.89038 13.915C6.89038 13.9928 6.92128 14.0674 6.97628 14.1225L9.8796 17.0258C9.93462 17.0808 10.0092 17.1117 10.087 17.1117C10.1648 17.1117 10.2394 17.0808 10.2944 17.0258L16.7002 10.62C16.755 10.5651 16.7858 10.4906 16.7858 10.4129C16.7858 10.3353 16.755 10.2608 16.7002 10.2058L13.8004 7.29778Z"
      fill="#203048"
      fill-opacity="0.6"
    />
    <path
      d="M6.38459 14.817C6.34768 14.7803 6.30165 14.754 6.25123 14.7409C6.2008 14.7278 6.14779 14.7283 6.09766 14.7425C6.04744 14.7566 6.00189 14.7838 5.96569 14.8213C5.92949 14.8589 5.90395 14.9054 5.8917 14.9561L5.00803 18.6392C4.99637 18.688 4.99742 18.739 5.01109 18.7873C5.02475 18.8356 5.05057 18.8795 5.08607 18.915C5.12181 18.9501 5.16582 18.9756 5.21403 18.9891C5.26224 19.0027 5.31308 19.0038 5.36185 18.9925L9.04205 18.1123C9.0928 18.1002 9.13939 18.0747 9.17702 18.0386C9.21465 18.0024 9.24196 17.9569 9.25613 17.9067C9.27029 17.8564 9.27081 17.8033 9.25763 17.7529C9.24444 17.7024 9.21803 17.6563 9.18111 17.6194L6.38459 14.817Z"
      fill="#203048"
      fill-opacity="0.6"
    />
    <path
      d="M18.5712 6.67491L17.3255 5.42861C17.0505 5.15415 16.6778 5 16.2893 5C15.9008 5 15.5281 5.15415 15.2531 5.42861L14.421 6.26006C14.366 6.31508 14.3351 6.38969 14.3351 6.46748C14.3351 6.54528 14.366 6.61989 14.421 6.67491L17.3255 9.57881C17.3806 9.63381 17.4552 9.66471 17.533 9.66471C17.6108 9.66471 17.6854 9.63381 17.7404 9.57881L18.5712 8.74619C18.8453 8.47122 18.9993 8.0988 18.9993 7.71055C18.9993 7.32229 18.8453 6.94987 18.5712 6.67491Z"
      fill="#203048"
      fill-opacity="0.6"
    />
  </svg>
);

const IconEditButton = ({ basePath = '', record = {}, ...rest }) => (
  <IconButton component={Link} to={linkToRecord(basePath, record.id)} {...rest}>
    {EditIcon}
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
        {hasDelete && (
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
