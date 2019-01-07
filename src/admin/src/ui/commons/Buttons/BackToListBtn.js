import React from 'react';
import { translate as translateDeco } from 'react-admin';
import { connect } from 'react-redux';
import {
  setCommonDialogAndOpen,
  closeCommonDialog,
} from '~/store/actions/general';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const BackToListBtn = translateDeco(
  connect(
    undefined,
    { setCommonDialogAndOpen, closeCommonDialog },
  )(({ history, basePath, translate, ...rest }) => {
    const modal = {
      content: translate('message.modal.createExitConfirm'),
      confirmCb: () => {
        history.push(basePath);
        rest.closeCommonDialog();
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
  }),
);

export default BackToListBtn;
