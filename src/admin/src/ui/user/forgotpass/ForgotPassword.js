import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import SendMail from './components/SendMail';

import { translate } from 'react-admin';
import { APP_VERSION } from '~/dataProvider/constants';
import BeLogo from '../../BeLogo';
import styles from '../styles';

@translate
@withStyles(styles)
export default class ForgotPasswordPage extends PureComponent {
  static propTypes = {
    // authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
  };

  render() {
    const { classes, translate } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <div className={classes.formWrapper}>
            <div style={{ paddingLeft: 0 }} className="header">
              <BeLogo />
            </div>
            <SendMail {...this.props} />

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
        </Card>
      </div>
    );
  }
}
