import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
// import IconLock from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/Visibility';
import { TextInput } from 'react-admin';

const IconLock = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 3C10.9703 3 9.98284 3.38631 9.25476 4.07394C8.52668 4.76158 8.11765 5.69421 8.11765 6.66667V8H15.8824V6.66667C15.8824 5.69421 15.4733 4.76158 14.7452 4.07394C14.0172 3.38631 13.0297 3 12 3ZM4.63636 8L6 8V6.66667C6 5.16377 6.63214 3.72243 7.75736 2.65973C8.88258 1.59702 10.4087 1 12 1C13.5913 1 15.1174 1.59702 16.2426 2.65973C17.3679 3.72243 18 5.16377 18 6.66667V8L19.3636 8C20.2674 8 21 8.69645 21 9.55556V20.4444C21 21.3036 20.2674 22 19.3636 22H4.63636C3.73262 22 3 21.3036 3 20.4444V9.55556C3 8.69645 3.73262 8 4.63636 8ZM5 10V20H19V10H5ZM11.3335 15C11.3335 14.4477 11.7812 14 12.3335 14C12.8858 14 13.3335 14.4477 13.3335 15C13.3335 15.5523 12.8858 16 12.3335 16C11.7812 16 11.3335 15.5523 11.3335 15ZM12.3335 12C10.6766 12 9.3335 13.3431 9.3335 15C9.3335 16.6569 10.6766 18 12.3335 18C13.9904 18 15.3335 16.6569 15.3335 15C15.3335 13.3431 13.9904 12 12.3335 12Z"
      fill="#203048"
    />
  </svg>
);

const VisibilityOn = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.4824 10.4331C20.057 7.76469 16.0341 4.94402 11.9994 5.00087C7.96459 4.9431 3.94173 7.76561 1.51628 10.4331C1.18381 10.8049 1 11.2861 1 11.7848C1 12.2835 1.18381 12.7647 1.51628 13.1364C3.91331 15.7765 7.87931 18.5724 11.8517 18.5724H12.1342C16.1203 18.5724 20.0854 15.7765 22.4852 13.1355C22.8172 12.7636 23.0005 12.2824 23 11.7838C22.9995 11.2853 22.8152 10.8044 22.4824 10.4331Z"
      fill="#203048"
      fill-opacity="0.2"
    />
    <path
      d="M1 11.7848C1 12.2835 1.18381 12.7647 1.51628 13.1364C3.91331 15.7765 7.87931 18.5724 11.8517 18.5724H12.1342C16.1203 18.5724 20.0854 15.7765 22.4852 13.1355C22.8172 12.7636 23.0005 12.2824 23 11.7838"
      stroke="#203048"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="3"
      y1="18"
      x2="4.41421"
      y2="16.5858"
      stroke="#203048"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="6.80028"
      y1="20.2826"
      x2="7.64922"
      y2="18.4718"
      stroke="#203048"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="1"
      y1="-1"
      x2="3"
      y2="-1"
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 21.1309 19.4142)"
      stroke="#203048"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="1"
      y1="-1"
      x2="3"
      y2="-1"
      transform="matrix(-0.42447 -0.905442 -0.905442 0.42447 16.8477 21.6125)"
      stroke="#203048"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="12"
      y1="21.7072"
      x2="12"
      y2="19.7072"
      stroke="#203048"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

export const renderInputPassword = props => <InputPassword {...props} />;

export default class InputPassword extends React.Component {
  static propTypes = {
    inputProps: PropTypes.object,
    inputContainerProps: PropTypes.object,
  };

  state = {
    showPassword: false,
  };

  handleClickShowPassword = () =>
    this.setState({
      showPassword: !this.state.showPassword,
    });

  render() {
    const {
      inputContainerProps,
      inputProps: nativeInputProps,
      ...rest
    } = this.props;

    const { showPassword } = this.state;

    return (
      <TextInput
        className="inputWrapper"
        variant="outlined"
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          className: 'input-login',
          ...nativeInputProps,
        }}
        InputProps={{
          className: 'input-container',
          startAdornment: (
            <InputAdornment position="start">
              <IconLock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <VisibilityOn />}
              </IconButton>
            </InputAdornment>
          ),
          ...inputContainerProps,
        }}
        {...rest}
        fullWidth
      />
    );
  }
}
