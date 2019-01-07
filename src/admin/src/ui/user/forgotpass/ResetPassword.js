import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
// import SendMail from './components/SendMail';
import ResetPass from './components/ResetPass';

import { Notification, translate } from 'react-admin';
import { APP_VERSION } from '~/dataProvider/constants';
import BeLogo from '../../BeLogo';

const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    background: 'url(/images/bg-login.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  card: {
    width: '385px',
    padding: '3.5em',
    display: 'flex',
    boxSizing: 'border-box',
    marginTop: 48,
    marginBottom: 50,
    marginRight: 42,
    minHeight: '620px',
    paddingBottom: '16px',

    // flexGrow: 1,
  },
  avatar: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  hint: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'flex-start',
    color: theme.palette.grey[500],
  },
  form: {
    padding: '0 0em 1em 0em',
  },
  input: {
    marginTop: '1em',
  },
  actions: {
    padding: '0 0em 1em 0em',
  },
  logo: {
    height: 20,
    width: 70,
    marginRight: 7,
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  inputWrapper: {
    marginTop: 0,
  },
  googleBadge: {
    width: 137,
  },
  appleBadge: {
    width: 125,
    marginRight: 12,
  },
  textSuccess: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#203048',
    fontFamily: 'IBM Plex Sans',
  },
  containerSuccess: {
    background: '#E2F4DF',
    paddingBottom: '14px',
    paddingTop: '14px',
    paddingRight: '16px',
    fontWeight: '100',
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    marginBottom: '15px',
  },
});

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      showSuccess: false,
    };
  }

  showSuccess = async () => {
    this.setState({ showSuccess: true });
    let self = this;
    setTimeout(function() {
      self.props.history.push('/login');
    }, 3000);
  };
  render() {
    const { classes, translate } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <div className={classes.formWrapper}>
            <div style={{ paddingLeft: '0px' }} className="header">
              <BeLogo />
            </div>
            <ResetPass showSuccess={this.showSuccess} {...this.props} />
            {this.state.showSuccess ? (
              <div className={classes.containerSuccess}>
                {' '}
                <i
                  style={{ color: '#4BA839', fontSize: '18px' }}
                  className="far fa-check-circle"
                />{' '}
                <div className={classes.textSuccess}>
                  Thay đổi mật khẩu thành công
                </div>
              </div>
            ) : null}
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

ForgotPasswordPage.propTypes = {
  authProvider: PropTypes.func,
  classes: PropTypes.object,
  previousRoute: PropTypes.string,
  translate: PropTypes.func.isRequired,
};

const enhance = compose(
  translate,
  withStyles(styles),
);

export default enhance(ForgotPasswordPage);
