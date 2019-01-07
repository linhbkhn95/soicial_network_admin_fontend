import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import qs from 'qs';

import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { translate, resetPassword } from 'react-admin';
import { renderInputPassword } from '~/ui/commons/input/InputPassword';
import { checkResetPassword } from '~/dataProvider/apiClient/auth';
import styles from '../../styles';

@translate
@reduxForm({
  form: 'resetPass',
  validate: (values, props) => {
    const errors = {};
    const { translate } = props;
    if (!values.new_password) {
      errors.new_password = translate('ra.validation.required');
    }
    if (!values.new_password) {
      errors.new_password = translate('ra.validation.required');
    }
    if (
      values.new_password &&
      values.re_new_password &&
      values.new_password != values.re_new_password
    )
      errors.re_new_password = translate('validation.passwordMatch');
    return errors;
  },
})
@connect(
  state => ({ isLoading: state.admin.loading > 0 }),
  { resetPassword },
)
@withStyles(styles)
export default class ResetPass extends Component {
  static propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
  };

  state = {
    showButtonBack: true,
  };

  login = async auth => {
    return new Promise((resolve, reject) => {
      this.props.resetPassword(
        auth,
        this.props.location.state
          ? this.props.location.state.nextPathname
          : '/',
        resolve,
        reject,
      );
    }).catch(e => {
      return Promise.reject(e);
    });
  };

  reset = auth => {
    this.login(auth).then((ret, err) => {
      if (err) {
        this.setState({ showButtonBack: false });
        throw err;
      }
      this.props.showSuccess();
    });
  };

  async componentDidMount() {
    try {
      const query_string = window.location.search.substring(1);
      await checkResetPassword(qs.parse(query_string));
    } catch (error) {
      console.log('resetpass error', error); // eslint-disable-line
      this.props.history.push('/login');
    }
  }

  render() {
    const { classes, handleSubmit, isLoading, translate } = this.props;
    return (
      <form onSubmit={handleSubmit(this.reset)} className={classes.formWrapper}>
        <div className={classes.formContent}>
          <div className="text-title-send-pass">
            {' '}
            {translate('text.resetPassword')}
          </div>
          <div className={classes.hint}>
            {translate('text.subTextResetPassword')}
          </div>

          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                name="new_password"
                icon="password"
                placeholder={translate('placeholder.newPassword')}
                component={renderInputPassword}
                // label={translate("label.input.newPassword")}
                disabled={isLoading}
              />
            </div>
            <div className={classes.input}>
              <Field
                name="re_new_password"
                placeholder={translate('placeholder.reNewPassword')}
                component={renderInputPassword}
                // label={translate("label.input.reNewPassword")}
                disabled={isLoading}
              />
            </div>
          </div>

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
              {translate('label.button.continue')}
            </Button>
          </CardActions>
          {/* {this.state.showButtonBack? <div onClick={this.goBack.bind(this)}  className="button-back">  {translate("label.button.back")}</div>:null} */}
        </div>
      </form>
    );
  }
}
