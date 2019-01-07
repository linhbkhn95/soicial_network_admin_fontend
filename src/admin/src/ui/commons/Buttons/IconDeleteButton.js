import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classnames from 'classnames';
import {
  translate as translateDeco,
  crudDelete,
  startUndoable,
} from 'react-admin';
import {
  setCommonDialogAndOpen,
  closeCommonDialog,
} from '~/store/actions/general';

import IconButton from '@material-ui/core/IconButton';
import TrashIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  deleteButton: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
});

@compose(
  connect(
    null,
    {
      startUndoable,
      dispatchCrudDelete: crudDelete,
      setCommonDialogAndOpen,
      closeCommonDialog,
    },
  ),
  withStyles(styles),
  translateDeco,
)
export default class IconDeleteButton extends Component {
  static defaultProps = {
    redirect: 'list',
    undoable: true,
  };

  static propTypes = {
    basePath: PropTypes.string,
    // classes: PropTypes.object,
    className: PropTypes.string,
    dispatchCrudDelete: PropTypes.func.isRequired,
    label: PropTypes.string,
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
    ]),
    resource: PropTypes.string.isRequired,
    startUndoable: PropTypes.func,
    translate: PropTypes.func,
    undoable: PropTypes.bool,
  };

  handleDelete = event => {
    if (event) {
      event.preventDefault();
    }

    const {
      dispatchCrudDelete,
      startUndoable,
      resource,
      record,
      basePath,
      redirect,
      undoable,
    } = this.props;
    if (undoable) {
      startUndoable(
        crudDelete(resource, record.id, record, basePath, redirect),
      );
    } else {
      dispatchCrudDelete(resource, record.id, record, basePath, redirect);
    }
  };

  render() {
    const {
      label = 'ra.action.delete',
      // classes = {},
      className,
      translate,
    } = this.props;
    const modalOnClick = event => ({
      content: translate('message.modal.deleteItemConfirm'),
      confirmCb: () => {
        this.handleDelete(event);
        this.props.closeCommonDialog();
      },
    });
    return (
      <IconButton
        onClick={event => {
          event.stopPropagation();
          this.props.setCommonDialogAndOpen(modalOnClick(event));
        }}
        label={label}
        className={classnames('ra-delete-button', className)}
        key="button"
      >
        <TrashIcon />
      </IconButton>
    );
  }
}
