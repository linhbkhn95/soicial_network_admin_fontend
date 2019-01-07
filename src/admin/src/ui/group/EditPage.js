import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Toolbar, Edit, SimpleForm } from 'react-admin';
import SaveButton from '~/utils/input/button/ButtonSave';
import Title from '~/ui/commons/Title';


import {
  validateFullname,
  validateEmail,
  validatePhone,
} from '../../utils/validators';
// import BackToListBtn from '~/ui/commons/Buttons/BackToListBtn';

import CoalesceForm from './components/CoalesceForm';
import { fleetEditMetas } from './components/formMetas';
import CancelBtn from '../commons/Buttons/CancelBtn';
import FormPrependBlock from "~/ui/commons/dialog/FormPrependBlock";
import formStyle from './formStyle';

const validate = (values, props) => {
  const errors = {};
  const { translate } = props;
  if (!values.name || (values.name && !values.name.trim())) {
    errors.name = [translate('validation.nameFleet')];
  }

  if (
    values.name &&
    values.name.trim() &&
    !validateFullname(values.name.trim())
  ) {
    errors.name = [translate('validation.failFullnameFleet')];
  }
  if (!values.email || !values.email.trim()) {
    errors.email = [translate('validation.email')];
  }
  if (values.email && !validateEmail(values.email.trim()))
    errors.email = [translate('validation.failEmail')];

  if (!values.phone) {
    errors.phone = [translate('validation.phone')];
  }
  if (values.phone && !validatePhone(values.phone)) {
    errors.phone = [translate('validation.failPhone')];
  }

  return errors;
};


const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      style={{ fontWeight: 'bold' }}
      label="label.button.edit"
      redirect="/fleets"
      submitOnEnter={true}
      // disabled={props.invalid}
    />
  </Toolbar>
);

@withStyles(formStyle)
export default class EditPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    dataProvider: PropTypes.any,
    basePath: PropTypes.string,
  };

  render() {
    const { classes, dataProvider,history, basePath, ...props } = this.props;
    
    return (
      <Edit
        // undoable={false}
     prependBlock={
        <FormPrependBlock showPrompt={true} history={history} basePath={basePath} />
      }
        title={<Title title="label.header.show_fleet" hasTranslate />}
        redirect="list"
        hasShow={false}
        {...props}
        
      >
        <SimpleForm
          redirect="list"
          validate={validate}
          toolbar={
            <PostEditToolbar
              // {...this.props}
              right={
                <CancelBtn
                  className={classes.buttonCancel}
                  style={{ fontWeight: 'bold!important' }}
                  history={history}
                />
              }
            />
          }
        >
          <CoalesceForm
            dataProvider={dataProvider}
            id="fleet"
            metas={fleetEditMetas}
          />
        </SimpleForm>
      </Edit>
    );
  }
}
