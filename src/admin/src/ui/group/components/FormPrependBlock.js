import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { translate as translateDeco } from "react-admin";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import NavigationPrompt from "react-router-navigation-prompt";
import DialogConfirm from "~/ui/commons/dialog/DialogConfirm";

import {
  setCommonDialogAndOpen,
  closeCommonDialog,
} from "~/store/actions/general";
import { Prompt } from "react-router-dom";

@connect(
  undefined,
  { setCommonDialogAndOpen, closeCommonDialog },
)
@translateDeco
export default class FormPrependBlock extends Component {
  static propTypes = {
    basePath: PropTypes.string,
    translate: PropTypes.func,
  };
  state = {
    formIsHalfFilledOut: true,
    value: "",
    accessBack: false,
  };

  componentDidMount() {
    this.props.history.listen((location, action) => {
      if (
        location.pathname != "/login" &&
        location.pathname != "/fleets" &&
        this.state.value != location.pathname
      ) {
        if (!this.state.accessBack && !this.state.formIsHalfFilledOut) {
          this.setState({
            formIsHalfFilledOut: true,
            value: location.pathname,
          });
        }
        return;
      } else {
        this.setState({
          formIsHalfFilledOut: false,
          value: location.pathname,
          accessBack: false,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.history.location.pathname == this.state.value)
      this.setState({
        formIsHalfFilledOut: false,
        // value:location.pathname,
      });
  }
  accessBack=()=>{
    console.log('accessBack=====>')
    const { history, basePath, translate, showPrompt, ...rest } = this.props;
    this.setState({ accessBack: true });
    const modal = {
      content: translate("message.modal.createExitConfirm"),
      confirmCb: () => {
        rest.closeCommonDialog();
        history.push(basePath);
      },
    };

    rest.setCommonDialogAndOpen(modal);
  }
  render() {
    const { history, basePath, translate, showPrompt, ...rest } = this.props;

    {
      /* <Prompt
            when={this.state.formIsHalfFilledOut&&!this.state.accessBack}
            message="Bạn có chắc chắn ?"
          /> */
    }
    return (
      <React.Fragment>
        <IconButton
          style={{ marginLeft: -14 }}
          onClick={()=>this.accessBack}
        >
          {showPrompt ? (
            <NavigationPrompt
              when={this.state.formIsHalfFilledOut && !this.state.accessBack}
            >
              {({ onConfirm, onCancel }) => (
                <DialogConfirm
                  titleDialog={translate("text.titleDialogPrompt")}
                  textConfirmDialog={translate("text.textConfirmDialogPrompt")}
                  textButtonYes={translate("label.button.continue")}
                  textButtonNo={translate("label.button.back")}
                  show={
                    this.state.formIsHalfFilledOut && !this.state.accessBack
                  }
                  disAgree={onCancel}
                  agree={onConfirm}
                />
              )}
            </NavigationPrompt>
          ) : null}

          <ArrowBack />
        </IconButton>
      </React.Fragment>
    );
  }
}
