import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate as translateDeco } from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import NavigationPrompt from 'react-router-navigation-prompt';
import DialogConfirm from '~/ui/commons/dialog/DialogConfirm';

import {
  setCommonDialogAndOpen,
  closeCommonDialog,
} from '~/store/actions/general';
import { Prompt } from 'react-router-dom';
import DirtyCheckOnChangeRoute from '../DirtyCheckOnChangeRoute';

@connect(
  state => ({}),
  { setCommonDialogAndOpen, closeCommonDialog },
)
@translateDeco
export default class FormPrependBlock extends Component {
  state = {
    formIsHalfFilledOut: true,
    value: '',
    accessBack: false,
    showModalConfirm: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.history.location.pathname == this.state.value)
      this.setState({
        formIsHalfFilledOut: false,
        // value:location.pathname,
      });
  }

  accessBack = () => {
    const { history, basePath, translate, showPrompt, ...rest } = this.props;
    this.setState({ showModalConfirm: true });

    // if (history.location.pathname != this.state.value) {
    //   this.setState({ accessBack: true });
    //   const modal = {
    //     content: translate("message.modal.createExitConfirm"),
    //     confirmCb: () => {
    //       rest.closeCommonDialog();
    //       history.push(basePath);
    //     },
    //   };
    //   rest.setCommonDialogAndOpen(modal);
    // }
  };

  onCancel = () => {
    this.setState({ showModalConfirm: false });
  };

  onConfirm = () => {
    const { history, basePath, translate, showPrompt, ...rest } = this.props;
    history.push(basePath);
    this.setState({ showModalConfirm: true });
  };

  render() {
    const { history, basePath, translate, showPrompt, ...rest } = this.props;

    /* <Prompt
            when={this.state.formIsHalfFilledOut&&!this.state.accessBack}
            message="Bạn có chắc chắn ?"
          /> */

    return (
      <React.Fragment>
        <div>
          <IconButton onClick={this.accessBack} style={{ marginLeft: -14 }}>
            <ArrowBack />
          </IconButton>
          <DialogConfirm
            titleDialog={translate('text.titleDialogPrompt')}
            textConfirmDialog={translate('text.textConfirmDialogPrompt')}
            textButtonYes={translate('label.button.continue')}
            textButtonNo={translate('label.button.back')}
            show={this.state.showModalConfirm}
            disAgree={this.onCancel}
            agree={this.onConfirm}
          />
          {/* {showPrompt && !this.state.accessBack ? (
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
          ) : null} */}
        </div>

        <DirtyCheckOnChangeRoute />
      </React.Fragment>
    );
  }
}
