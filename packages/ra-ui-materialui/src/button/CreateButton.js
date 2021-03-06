import React from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import MuiButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ContentAdd from '@material-ui/icons/Add';
import compose from 'recompose/compose';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { translate } from 'ra-core';

import Button from './Button';
import Responsive from '../layout/Responsive';

const styles = theme => ({
  floating: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 60,
    left: 'auto',
    position: 'fixed',
    zIndex: 1000,
  },
  floatingLink: {
    color: 'inherit',
  },
});

const CreateButton = ({
  basePath = '',
  className,
  classes = {},
  translate,
  label = 'ra.action.create',
  ...rest
}) => (
  <Responsive
    small={
      <MuiButton
        component={Link}
        variant="fab"
        color="primary"
        className={classnames(classes.floating, className)}
        to={`${basePath}/create`}
        {...rest}
      >
        <ContentAdd />
      </MuiButton>
    }
    medium={
      <Button
        component={Link}
        to={`${basePath}/create`}
        className={className}
        variant="fab"
        color="primary"
        label={label && translate(label)}
        {...rest}
      >
        <ContentAdd />
      </Button>
    }
  />
);

CreateButton.propTypes = {
  basePath: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
  label: PropTypes.string,
  size: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

const enhance = compose(
  translate,
  onlyUpdateForKeys(['basePath', 'label']),
  withStyles(styles),
);

export default enhance(CreateButton);
