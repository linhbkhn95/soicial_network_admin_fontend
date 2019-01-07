import React from "react";
import Grid from "@material-ui/core/Grid";
import PaddingPaper from "~/ui/commons/PaddingPaper";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  userChangePass,
  TextInput,
  translate as translateDeco,
} from "react-admin";

import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { apiParamsKey } from "~/dataProvider/constants";

import LabelField from "~/ui/commons/LabelField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { formValueSelector, reduxForm, reset } from "redux-form";
import "./index.css";

const selector = formValueSelector("record-form");

const styles = {
  gridItemLeft: {
    paddingBottom: 8,
    paddingRight: 4,
  },
  gridItemRight: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    display: "flex",
  },
  paper: {
    marginBottom: "24px",
    paddingLeft: "24px",
    paddingTop: "22px",
    paddingRight: "",
    paddingBottom: "30px",
  },
  button: {
    fontWeight: "bold",
    boxShadow: "none",
    color: "#203048",
    lineHeight: "22px",
    fontSize: "14px",
    padding: "9px 57px",
    marginLeft: "-2px",
    background: "#FFBB00",
  },
  title: {
    color: "#203048 !important",
    lineHeight: "37px  !important",
    fontSize: "24px  !important",
    fontFamily: "'IBM Plex Sans', sans-serif",
    marginBottom: "16px  !important",
    marginTop: "-6px !important",
  },
  grid: {
    marginTop: "-8px !important",
  },
  icon: {
    color: "#4BA839",
    position: "absolute",
    marginTop: "24px",
    marginLeft: "-22px",
  },
};

@translateDeco
@reduxForm({
  form: "changePass",
  validate: (values, props) => {
    const errors = {};
    // const { translate } = props;
    // if (!values.old_password) {
    //   errors.old_password = translate("ra.validation.required");
    // }
    // if (!values.new_password) {
    //   errors.new_password = translate("ra.validation.required");
    // }
    // if (!values.re_new_password) {
    //   errors.re_new_password = translate("ra.validation.required");
    // }
    return errors;
  },
})
@connect(
  state => ({
    record: {
      old_password: selector(state, "currentPassword"),
      new_password: selector(state, "newPassword"),
    },
  }),
  { userChangePass },
)
@withStyles(styles)
export default class ChangePass extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    validate: false,
    input: {},
    successful: false,
  };

  onChange(type, e) {
    // eslint-disable-next-line
    this.state.input[type] = e.target.value;
    let validate = this.state.validate;
    if (type == "re_new_password" || type == "new_password")
      if (this.state.input.new_password == this.state.input.re_new_password)
        validate = true;

    this.setState({ input: this.state.input, validate });
    // if (values.new_password && values.re_new_password == values.new_password)
    //   this.setState({ validate: true });
    // else if (this.state.validate) this.setState({ validate: false });
    // // return errors;
  }
  changePasssword = auth => {
    let onSuccess = {
      // notification: {
      //   body: "message.changePasswordSuccess",
      //   level: "success",
      // },
      successActionCreators: [() => reset("changePass")],
    };
    return new Promise((resolve, reject) =>
      this.props.userChangePass(auth, { onSuccess }, resolve, reject),
    ).then((ret, err) => {
      if (err) {
        console.log('loi vclllldalđ')
        this.setState({ successful: false });

        throw err;
      }

      this.setState({ validate: false, successful: true, input: {} });
      this.props.dispatch(reset("createDriver"));
    });
  };

  render() {
    const { valid, classes, handleSubmit,submitFailed, translate, resource } = this.props;
    let flag =
      this.state.input.new_password &&
      this.state.input.re_new_password &&
      (this.state.input.re_new_password != this.state.input.new_password &&
        valid);
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <div className="change-pass">
            <Grid item md={12} lg={12} className={classes.gridItemLeft}>
              <Typography
                className={classes.title}
                gutterBottom
                variant="subheading"
              >
                {` ${translate("resources.changepass.name")}`}
              </Typography>
              {this.state.successful&&!submitFailed ? (
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans'",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "20px",
                    fontSize: "14px",
                    color: "#4BA839",
                    marginTop: "-15px",
                    marginBottom: "17px",
                  }}
                >
                  {translate("text.changePasswordSuccess")}
                </p>
              ) : null}
              <form onSubmit={handleSubmit(this.changePasssword)}>
                <PaddingPaper className={classes.paper}>
                  {/* validate={this.validateChangepass} toolbar={null} */}
                  <LabelField label={"label.input.currentPassword"}>
                    <Grid className={classes.grid} item md={6} lg={3} sm={10}>
                      <TextInput
                        resource={resource}
                        variant="outlined"
                        source={apiParamsKey.oldPassword}
                        fullWidth={true}
                        type="password"
                        onChange={this.onChange.bind(
                          this,
                          apiParamsKey.oldPassword,
                        )}
                        //  placeholder ="Fill name driver"
                        placeholder={`${translate(
                          "placeholder.currentPassword",
                        )}`}
                      />
                    </Grid>
                  </LabelField>
                  <LabelField label={"label.input.newPassword"}>
                    <Grid className={classes.grid} item md={6} lg={3} sm={10}>
                      <TextInput
                        resource={resource}
                        variant="outlined"
                        fullWidth={true}
                        onChange={this.onChange.bind(
                          this,
                          apiParamsKey.newPassword,
                        )}
                        // placeholder ="Fill phone driver"
                        source={apiParamsKey.newPassword}
                        type="password"
                        placeholder={` ${translate("placeholder.newPassword")}`}
                      />
                    </Grid>
                  </LabelField>
                  <LabelField label={"label.input.reNewPassword"}>
                    <Grid className={classes.grid} item md={6} lg={3} sm={10}>
                      <TextInput
                        resource={resource}
                        variant="outlined"
                        fullWidth={true}
                        onChange={this.onChange.bind(
                          this,
                          apiParamsKey.renewPassword,
                        )}
                        type="password"
                        source={apiParamsKey.renewPassword}
                        placeholder={` ${translate(
                          "placeholder.reNewPassword",
                        )}`}
                      />
                      {this.state.validate &&
                      valid &&
                      this.state.input[apiParamsKey.oldPassword] &&
                        this.state.input[apiParamsKey.renewPassword] &&
                        this.state.input[apiParamsKey.newPassword] &&
                      this.state.input[apiParamsKey.newPassword] === this.state.input[apiParamsKey.renewPassword]
                      ? (
                        <CheckCircleIcon className={classes.icon} />
                      ) : null}
                    </Grid>
                  </LabelField>
                  {flag ? (
                    <p style={{ color: "#E0344B", fontSize: "12px" }}>
                      {translate("text.textFailNewPassword")}
                    </p>
                  ) : null}
                </PaddingPaper>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    !valid ||
                    !this.state.validate ||
                    !this.state.input[apiParamsKey.oldPassword] ||
                    !this.state.input[apiParamsKey.renewPassword] ||
                    !this.state.input[apiParamsKey.newPassword] ||
                    this.state.input[apiParamsKey.newPassword] !=
                      this.state.input[apiParamsKey.renewPassword]
                  }
                >
                  {` ${translate("label.button.changePassword")}`}
                </Button>
              </form>
            </Grid>
          </div>
        </Grid>
      </React.Fragment>
    );
  }
}
