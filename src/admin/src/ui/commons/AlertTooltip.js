import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
// import { capitalizeFirstLetter } from '~/utils';

const styles = {
  tooltip: {
    backgroundColor: '#ffffff',
    color: 'rgba(32, 48, 72, 0.8)',
    fontSize: 14,
    fontFamily: '"IBM Plex Sans", sans-serif',
    padding: 16,
    zIndex: '999999999999 !important',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    '&:after, &:before': {
      bottom: '100%',
      left: '50%',
      border: 'solid transparent',
      content: `""`,
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
    },
    '&:before': {
      borderColor: 'rgba(194, 225, 245, 0)',
      borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 11,
      marginLeft: -11,
    },
    '&:after': {
      borderColor: 'rgba(255, 255, 255, 0)',
      borderBottomColor: '#ffffff',
      borderWidth: 10,
      marginLeft: -10,
    },
  },
};

const AlertTooltip = ({ message, type = 'error', classes }) => {
  const iconCls =
    type === 'error'
      ? 'fas fa-exclamation-triangle'
      : 'fas fa-exclamation-circle';
  const iconStl =
    type === 'error'
      ? { color: '#E0344B', marginLeft: 10, fontSize: 20 }
      : { color: '#FFE401', marginLeft: 10, fontSize: 20 };

  return (
    <Tooltip title={message} classes={{ tooltip: classes.tooltip }}>
      <i style={iconStl} className={iconCls} />
    </Tooltip>
  );
};

export default withStyles(styles)(AlertTooltip);
