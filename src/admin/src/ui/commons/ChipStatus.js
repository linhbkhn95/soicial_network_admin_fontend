import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { translate } from 'react-admin';

const styles = {
  root: {
    margin: 8,
    border: 'none',
    cursor: 'default',
    height: 32,
    outline: 'none',
    padding: 0,
    display: 'inline-flex',
    fontSize: 12,
    whiteSpace: 'nowrap',
    alignItems: 'center',
    borderRadius: 16,
    verticalAlign: 'middle',
    textDecoration: 'none',
    justifyContent: 'center',
  },
  label: {
    cursor: 'inherit',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    paddingLeft: 12,
    fontSize:14,
    paddingRight: 12,
  },
};

const ChipStatus = withStyles(styles)(
  ({ statusStyles, statusCode, classes, translate }) => {
    const style =
      (statusCode !== null &&
        statusCode !== undefined &&
        statusStyles[statusCode.toString()]) ||
      {};
    const {
      bg = '#e0e0e0',
      tc = 'rgba(0, 0, 0, 0.87)',
      label = 'none',
    } = style;
    return (
      <div className={classes.root} style={{ backgroundColor: bg }}>
        <span className={classes.label} style={{ color: tc }}>
          {translate(label)}
        </span>
      </div>
    );
  },
);

export default translate(ChipStatus);
