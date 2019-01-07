import React from 'react';
import { translate as translateDeco } from 'react-admin';
import { connect } from 'react-redux';
import { isDirty } from 'redux-form';
import DialogConfirm from '~/ui/commons/dialog/DialogConfirm';

import { history } from '../../utils';

@translateDeco
@connect(state => ({
  isDirty: isDirty('record-form')(state),
}))
export default class DirtyCheckOnChangeRoute extends React.Component {
  state = {
    isDirty: false,
    needShowDialog: true,
  };

  onCancel = () =>
    this.setState({
      needShowDialog: false,
    });

  onConfirm = () => {
    alert('change url');

    this.setState({
      needShowDialog: false,
    });
  };

  componentDidMount() {
    this.unlisten = history.listen((location, action) => {
      console.log('change');
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    let isShowing = true;
    if (!this.props.isDirty) {
      isShowing = false;
    }

    if (!this.state.needShowDialog) {
      isShowing = false;
    }

    const { translate } = this.props;

    return null;

    // return (
    //   <div>
    //     <DialogConfirm
    //       titleDialog={translate('text.titleDialogPrompt')}
    //       textConfirmDialog={translate('text.textConfirmDialogPrompt')}
    //       textButtonYes={translate('label.button.continue')}
    //       textButtonNo={translate('label.button.back')}
    //       show={isShowing}
    //       disAgree={this.onCancel}
    //       agree={this.onConfirm}
    //     />
    //   </div>
    // );
  }
}
