import React from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  padding16: {
    padding: 16,
  },
};

const PaddingPaper = withStyles(styles)(({ classes, ...rest }) => (
  <Paper className={classes.padding16} {...rest} />
));

export default PaddingPaper;
