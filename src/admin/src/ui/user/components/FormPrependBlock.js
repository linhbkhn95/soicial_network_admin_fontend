import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate as translateDeco } from 'react-admin';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {
  setCommonDialogAndOpen,
  closeCommonDialog,
} from '~/store/actions/general';

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

  render() {
    const { history, basePath, translate, ...rest } = this.props;
    console.log('baseBath'.basePath)
    const modal = {
      content: translate('message.modal.createExitConfirm'),
      confirmCb: () => {
        rest.closeCommonDialog();
        history.push(basePath);
      },
    };

    return (
      <IconButton
        style={{ marginLeft: -14 }}
        onClick={() => rest.setCommonDialogAndOpen(modal)}
      >
        <ArrowBack />
      </IconButton>
    );
  }
}
