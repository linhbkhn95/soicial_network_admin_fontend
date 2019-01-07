import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import TrashIcon from '@material-ui/icons/Delete';
import get from 'lodash/get';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: theme.spacing.unit,
  },
});

const EditBar = withStyles(styles)(({ toggleStatusSrc, classes, record }) => {
  return (
    <div className={classes.root}>
      <Switch checked={get(record, toggleStatusSrc)} color="primary" />
      <IconButton className={classes.btn}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <TrashIcon fontSize="small" />
      </IconButton>
    </div>
  );
});

export default EditBar;
