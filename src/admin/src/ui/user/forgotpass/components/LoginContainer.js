import React, { Component } from "react";
import PropTypes from "prop-types";
import { propTypes, reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { translate, userLogin } from "react-admin";
import { Link } from "react-router-dom";
import { renderInputPassword } from "~/ui/commons/input/InputPassword";
import { urlStore } from "~/dataProvider/constants";
import { renderUsername } from "../../../commons/input/InputUsername";
import styles from "../../styles";

@translate
@reduxForm({
  form: "signIn",
  validate: (values, props) => {
    const errors = {};
    const { translate } = props;
    if (!values.phone) {
      errors.phone = translate("validation.email");
    }
    if (!values.password) {
      errors.password = translate("validation.password");
    }
    return errors;
  },
})
@connect(
  state => ({ isLoading: state.admin.loading > 0 }),
  { userLogin },
)
@withStyles(styles)
export default class Login extends Component {
  static propTypes = {
    ...propTypes,
    authProvider: PropTypes.func,
    classes: PropTypes.object,
    previousRoute: PropTypes.string,
    translate: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
  };

  state = {
    countLoginFail: 0,
    err_msg:''
  };

  login = auth => {
    return new Promise((resolve, reject) => {
      this.props.userLogin(
        auth,
        this.props.location.state
          ? this.props.location.state.nextPathname
          : "/",
        resolve,
        e => {
          
          if (e.errors && e.errors.login_fisttime) {
            this.props.history.push("/forgot-password");
          } else {
            
            this.setState(
              { countLoginFail: this.state.countLoginFail + 1 },
              () => {

                reject(e);
              },
            );
          }
        },
      );
    });
  };

  showSendmail = () => {
    // this.props.handleNext();
    this.props.history.push("/forgot-password");
  };

  loginSubmit = () => {
    let { handleSubmit } = this.props;
    handleSubmit(this.login);
  };
  render() {
    const {
      classes,
      handleSubmit,
      submitFailed,
      isLoading,
      // valid,
      translate,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.login)} className={classes.formWrapper}>
        <div className={classes.formContent}>
          <div className={classes.loginWelcome}>
            {translate("message.welcome")}
          </div>
          <div className={classes.hint}>
            {translate("message.singin_with_phone_number")}
          </div>
          <div className={classes.form}>
            <div className={classes.input}>
              <Field
                name="phone"
                placeholder={translate("placeholder.yourEmail")}
                component={renderUsername}
                // label={translate('label.input.email')}
                disabled={isLoading}
              />
            </div>
            <div className={classes.input}>
              <Field
                name="password"
                placeholder={translate("placeholder.password")}
                component={renderInputPassword}
                disabled={isLoading}
              />
            </div>
            {/* <div className="err-msg-login" >{this.state.err_msg}</div> */}
          </div>
          
          {submitFailed && this.state.countLoginFail >= 3 ? (
            <Link to="/forgot-password" className="text-forgot-password">
              {translate("text.textForgotPassword")}
            </Link>
          ) : null}
          <CardActions className={classes.actions}>
            <Button
              variant="raised"
              type="submit"
              color="primary"
              className={classes.button}
              fullWidth
            >
              {isLoading && <CircularProgress size={18} thickness={2} />}
              {translate("label.button.signin")}
            </Button>
          </CardActions>
          
          <div
            style={{
              marginTop: "20px",
              marginBottom: "40px",
            }}
          >
            <small>{translate("message.have_app")}</small>
            <div
              style={{ marginTop: "5px" }}
              className="d-flex justify-content-start"
            >
              <a target="_blank" href={urlStore.appStore}>
                <img
                  alt="apple store"
                  className={classes.appleBadge}
                  src="/images/app-store.svg"
                />
              </a>
              <a target="_blank" href={urlStore.googlePlay}>
                <img
                  alt="google store"
                  className={classes.googleBadge}
                  src="/images/google-play.svg"
                />
              </a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
