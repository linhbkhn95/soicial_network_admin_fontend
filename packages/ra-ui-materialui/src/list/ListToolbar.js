import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  toolbar: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'flex-start',
    paddingRight: 0,
  },
};

const ListToolbar = ({
  classes = {},
  filters,
  actions,
  bulkActions,
  exporter,
  ...rest
}) => (
  <Toolbar className={classes.toolbar}>
    {filters &&
      React.cloneElement(filters, {
        ...rest,
        context: 'form',
      })}
    <span />
    {actions &&
      React.cloneElement(actions, {
        ...rest,
        bulkActions,
        exporter,
        //filters,
      })}
  </Toolbar>
);

ListToolbar.propTypes = {
  classes: PropTypes.object,
  filters: PropTypes.element,
  actions: PropTypes.element,
  bulkActions: PropTypes.element,
  exporter: PropTypes.func,
};

export default withStyles(styles)(ListToolbar);
