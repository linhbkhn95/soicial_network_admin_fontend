import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import {
  email,

  // Notification,
  translate,
  // userLogin,
  forgotPassword,
} from 'react-admin';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconLock from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import InfoIcon from '@material-ui/icons/Info';
import { validateEmail } from '~/utils/validators';
import { renderEmail } from '../../../commons/input/InputUsername';
import styles from '../../styles';
// import { forgotPassword } from '~/dataProvider/apiClient/auth';

const IconInfo = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
      fill="#006DBA"
    />
    <path
      d="M10.0317 16.096C9.74366 16.096 9.50366 16.016 9.31166 15.856C9.13032 15.6853 9.03966 15.4453 9.03966 15.136V8.95999C9.03966 8.65066 9.13032 8.41599 9.31166 8.25599C9.50366 8.09599 9.74366 8.01599 10.0317 8.01599C10.3197 8.01599 10.5597 8.09599 10.7517 8.25599C10.9437 8.41599 11.0397 8.65066 11.0397 8.95999V15.136C11.0397 15.4453 10.9437 15.6853 10.7517 15.856C10.5597 16.016 10.3197 16.096 10.0317 16.096ZM10.0317 6.59199C9.66899 6.59199 9.38099 6.49599 9.16766 6.30399C8.95432 6.10132 8.84766 5.83999 8.84766 5.51999C8.84766 5.19999 8.95432 4.94399 9.16766 4.75199C9.38099 4.55999 9.66899 4.46399 10.0317 4.46399C10.3837 4.46399 10.6663 4.55999 10.8797 4.75199C11.1037 4.94399 11.2157 5.19999 11.2157 5.51999C11.2157 5.83999 11.109 6.10132 10.8957 6.30399C10.6823 6.49599 10.3943 6.59199 10.0317 6.59199Z"
      fill="#006DBA"
    />
  </svg>
);

@translate
@reduxForm({
  form: 'sendMail',
  validate: (values, props) => {
    const errors = {};
    const { translate } = props;
    if (!values.email) {
      errors.email = translate('ra.validation.required');
    }
    // if (values.email && !validateEmail(values.email.trim()))
    //   errors.email = translate("validation.failEmail");
    return errors;
  },
})
@connect(
  state => ({ isLoading: state.admin.loading > 0 }),
  { forgotPassword },
)
@reduxForm({
  form: 'sendMail',
  validate: (values, props) => {
    const errors = {};
    const { translate } = props;
    if (!values.email) {
      errors.email = translate('ra.validation.required');
    }
    // if (values.email && !validateEmail(values.email.trim()))
    //   errors.email = translate("validation.failEmail");
    return errors;
  },
})
export default class SendMail extends Component {
  static propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
  };

  state = {
    email_user: '', // 'trinhducbaolinh@gmail.com',
    show: false,
  };

  forgotPassword = async auth => {
    const { forgotPassword } = this.props;

    try {
      await new Promise((resolve, reject) =>
        forgotPassword(
          auth,
          this.props.location.state
            ? this.props.location.state.nextPathname
            : '/',
          resolve,
          reject,
        ),
      );

      this.setState({
        show: true,
      });
    } catch (e) {
      this.setState({ show: false });
      throw e;
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  onChange = e => {
    this.setState({ email_user: e.target.value });
  };

  render() {
    const {
      classes,
      handleSubmit,
      // submitFailed,
      isLoading,
      translate,
    } = this.props;
    const { email_user } = this.state;

    const validateEmail = email();

    return (
      <form
        onSubmit={handleSubmit(this.forgotPassword)}
        className={classes.formWrapper}
      >
        <div className={classes.formContent}>
          <div className="text-title-send-pass">
            {translate('text.resetPassword')}
          </div>
          <div className={classes.hint}>
            {translate('text.subTextSendMail')}
          </div>

          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                name="email"
                placeholder={translate('placeholder.yourEmail')}
                component={renderEmail}
                disabled={isLoading}
                onChange={this.onChange}
                validate={validateEmail}
              />
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={this.state.show}
            // onClose={this.handleClose}
            ContentProps={{
              classes: {
                root: classes.snackbar,
              },
            }}
            message={
              <span style={{ display: 'flex' }} id="message-id">
                <IconInfo />{' '}
                <div
                  style={{ marginLeft: '5px' }}
                  dangerouslySetInnerHTML={{
                    __html: translate('text.forgotPasswordSentEmail', {
                      email_user,
                    }),
                  }}
                />
              </span>
            }
          />
          <CardActions className={classes.actions}>
            <Button
              variant="raised"
              type="submit"
              color="primary"
              disabled={isLoading}
              className={classes.button}
              fullWidth
            >
              {isLoading && <CircularProgress size={18} thickness={2} />}
              {translate('label.button.sendEmail')}
            </Button>
          </CardActions>
          <div onClick={this.goBack} className="button-back">
            {translate('label.button.back')}
          </div>
        </div>
      </form>
    );
  }
}
