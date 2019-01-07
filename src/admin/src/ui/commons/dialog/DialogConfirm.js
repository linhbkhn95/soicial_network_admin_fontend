import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
// import compose from "recompose/compose";
import PropTypes from 'prop-types';

const styles = theme => ({
  button: {
    border: 'solid 1px #FFBB00',
    backgroundColor: '#FFBB00!important',
    color: '#203048',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px 24px',
  },
  buttonNo: {
    border: 'solid 1px #D2D6DA',
    color: '#203048',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '10px 24px',
  },
  titleContainer: {
    flexDirection: 'row',
    display: 'flex',
  },
  title: {
    color: '#203048',
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: 'bold',
    fontFamily: "'IBM Plex Sans'",
    flex: 1,
  },
  textConfirm: {
    color: '#203048',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: "'IBM Plex Sans'",
  },
});

// @translate
@withStyles(styles)
export default class AlertDialog extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    agree: PropTypes.func,
    classes: PropTypes.object,
    disAgree: PropTypes.string,
    // translate: PropTypes.func.isRequired,
    titleDialog: PropTypes.string,
    textConfirm: PropTypes.string,
    textButtonYes: PropTypes.string,
    textButtonNo: PropTypes.string,
    textConfirmDialog: PropTypes.string,
  };

  static defaultProps = {
    show: false,
    agree: () => {},
    disAgree: () => {},
    // titleDialog: 'text.titleDialog',
    // textConfirmDialog: 'text.textConfirmDialog',
    // textButtonYes: 'label.button.agree',
    // textButtonNo: 'label.button.disAgree',
  };

  disAgree = () => {
    this.props.disAgree();
  };

  handleAgree = () => {
    this.props.agree();
  };

  render() {
    const {
      titleDialog,
      textConfirmDialog,
      textButtonYes,
      textButtonNo,
      // translate,
      classes,
    } = this.props;

    // titleDialog ? titleDialog : translate(titleDialog);
    // textConfirmDialog ? textConfirmDialog : translate(textConfirmDialog);
    // textButtonYes ? textButtonYes : translate(textButtonYes);
    // textButtonNo ? textButtonNo : translate(textButtonNo);

    return (
      <div>
        <Dialog open={this.props.show} onClose={this.disAgree}>
          <DialogTitle disableTypography className={classes.titleContainer}>
            <div className={classes.title}>{titleDialog}</div>
            <CloseIcon
              style={{ fontSize: 26, cursor: 'pointer' }}
              onClick={this.disAgree}
            />
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              {textConfirmDialog}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              justifyContent: 'flex-start',
              padding: '20px',
              marginTop: 0,
            }}
          >
            <Button
              className={classes.button}
              onClick={this.handleAgree}
              autoFocus
            >
              {textButtonYes}
            </Button>
            <Button className={classes.buttonNo} onClick={this.disAgree}>
              {textButtonNo}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
