import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { TextInput } from 'react-admin';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';
import classnames from 'classnames';

const searchFilterStyles = {
  control: {
    marginTop: 1,
    marginBottom: 0,
    minWidth: 300,
  },
  inputRoot: {
    backgroundColor: '#fff',
  },
};

const SearchInput = ({ classes, translate, ...props }) => (
  <TextInput
    label={false}
    placeholder={translate('ra.action.search')}
    InputProps={{
      className: classnames(classes.inputRoot, 'search-root'),
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon color="disabled" />
        </InputAdornment>
      ),
    }}
    inputProps={{
      className: 'search-input',
    }}
    className={classes.control}
    {...props}
  />
);

SearchInput.propTypes = {
  classes: PropTypes.object,
  translate: PropTypes.func,
};

const enhance = compose(
  translate,
  withStyles(searchFilterStyles),
);

export default enhance(SearchInput);
