import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { translate as translateDeco } from 'react-admin';
import compose from 'recompose/compose';
import { closeCommonDialog as closeCommonDialogActionGen } from '~/store/actions/general';

const onConfirm = (dispatch, confirmActions, confirmCb) => {
  if (Array.isArray(confirmActions)) {
    confirmActions.forEach(
      action =>
        typeof action === 'function' ? dispatch(action()) : dispatch(action),
    );
  } else if (typeof confirmActions === 'function') {
    dispatch(confirmActions());
  } else if (typeof confirmActions === 'string') {
    dispatch(confirmActions);
  }

  if (typeof confirmCb === 'function') {
    confirmCb();
  }
};

const CommonDialog = ({
  content,
  title,
  confirmActions,
  confirmCb,
  confirmLabel,
  cancelLabel,
  cancelCb,
  isOpen,
  translate,
  dispatch,
  closeCommonDialog,
  ...props
}) => {
  return (
    <Dialog maxWidth="sm" open={isOpen} {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onConfirm(dispatch, confirmActions, confirmCb)}
        >
          {confirmLabel || translate('label.button.confirm')}
        </Button>
        <Button variant="contained" onClick={() => closeCommonDialog()}>
          {cancelLabel || translate('label.button.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default compose(
  translateDeco,
  connect(
    state => ({
      ...(state.setting && state.setting.commonDialog),
    }),
    {
      dispatch: action => action,
      closeCommonDialog: closeCommonDialogActionGen,
    },
  ),
)(CommonDialog);
