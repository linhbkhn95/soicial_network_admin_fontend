import React from 'react';

// import Avatar from "@material-ui/core/Avatar";
// import Button from '@material-ui/core/Button';
// import Card from "@material-ui/core/Card";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconEmail from '../IconEmail';
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

export const renderUsername = ({
  meta: { touched, error } = {},
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    // className="inputWrapper"
    error={!!(touched && error)}
    helperText={touched && error}
    variant="outlined"
    margin="normal"
    inputProps={{
      className: 'input-login',
    }}
    InputLabelProps={{
      shrink: true,
    }}
    InputProps={{
      className: 'input-container',
      startAdornment: (
        <InputAdornment position="start">
          <IconEmail />
        </InputAdornment>
      ),
    }}
    {...inputProps}
    {...props}
    fullWidth
  />
);

export const renderEmail = renderUsername;
