import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import LoginContainer from './user/forgotpass/components/LoginContainer';

import { Notification, translate } from 'react-admin';
import { APP_VERSION } from '../dataProvider/constants';
import BeLogo from './BeLogo';
import styles from './user/styles';

@translate
@withStyles(styles)
export default class Login extends Component {
  static propTypes = {
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
  };

  state = {
    activeStep: 0,
  };

  login = auth => {
    return new Promise((resolve, reject) => {
      this.props.userLogin(
        auth,
        this.props.location.state
          ? this.props.location.state.nextPathname
          : '/',
        resolve,
        reject,
      );
    });
  };

  render() {
    const { classes, translate } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card} elevation={2}>
          <div className={classes.formWrapper}>
            <div style={{ paddingLeft: '0px' }} className="header">
              <BeLogo />
            </div>
            <LoginContainer {...this.props} />
            {/* <LoginContainer {...this.props} /> */}
            {/* <SendMail /> */}
            {/* <ResetPass /> */}
            <div className="d-flex justify-content-between">
              <span className="c2">© be 2018</span>
              <a href="http://agiletech.vn">
                <span
                  style={{
                    color: '#006DBA',
                    lineHeight: '16px',
                    fontWeight: 'bold',
                  }}
                  className="c2"
                >
                  {translate('label.support')}
                </span>
              </a>
            </div>
            <div className="version-web"> V {APP_VERSION}</div>
          </div>
          {/* <SendMail /> */}
        </Card>
        <Notification />
      </div>
    );
  }
}
