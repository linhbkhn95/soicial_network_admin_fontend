import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClearIcon from '@material-ui/icons/Clear';
import LabelField from '~/ui/commons/LabelField';
import { crudCreate as crudCreateAction } from 'react-admin';
import { connect } from 'react-redux';
import { formValueSelector, reduxForm, Field, reset } from 'redux-form';
import { models } from 'data-generator';
// import SelectUtils from '~/ui/commons/SelectUtils';
// import ReactSelect from '~/ui/commons/ReactSelect';
import { generalizeVNPhoneNumber } from '~/ui/commons/MaskedInputGen';
import {
  validateFullname,
  // validatePhone
} from '~/utils/validators';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// import { Modal } from '@material-ui/core';
import { TextInput, DateInput, translate as translateDeco } from 'react-admin';
import compose from 'recompose/compose';
import { validatePhone } from '~/utils/validators';

const selector = formValueSelector('createDriver');

const styles = theme => ({
  buttonCancel: {
    //   margin: theme.spacing.unit,
    border: '1px solid rgba(17, 17, 17, 0.1)',
    color: ' #111111',
    fontWeight: 'bold',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  dialog: {
    minWidth: '316px',
    borderRadius: '8px',
    overflowY: 'visible',
  },
  buttonCreate: {
    fontWeight: 'bold',
    boxShadow: 'none',
  },
  rightIcon: {
    float: 'right',
    display: 'flex',
    cursor: 'pointer',
    marginTop: '2px',
    fontSize: '24px',
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  title: {
    color: '#111111',
    fontStyle: 'bold',
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: 'bold',
    fontFamily: "'IBM Plex Sans'",
  },
  actionDialog: {
    justifyContent: 'end',
    marginLeft: '21px',
    marginBottom: '21px',
  },
  label: {
    fontWeight: '500',
    lineHeight: '25px',
    fontSize: '16px',
    fontFamily: 'IBM Plex Sans',
  },
  select: {
    // fontFamily: "'IBM Plex Sans', sans-serif",
    // color: "rgba(32, 48, 72, 0.4) !important",
    zIndex: '10000000',
  },
  modal: {
    overflowY: 'visible',
  },
});

const customStyles = {
  option: (base, state) => ({
    ...base,
    zIndex: '10000000000',
  }),
  menu: base => ({
    ...base,
    // none of react-selects styles are passed to <View />
    zIndex: '10000000000',
  }),
  container: base => ({
    ...base,
    // none of react-selects styles are passed to <View />
    borderColor: 'rgba(32, 48, 72, 0.1)',
  }),
  placeholder: base => ({
    ...base,
    // none of react-selects styles are passed to <View />
    color: 'hsl(0, 5%, 65%)',
  }),
  menuplacer: base => ({
    ...base,
    // none of react-selects styles are passed to <View />
    zIndex: '10000000000',
  }),
};

const fieldComponents = {
  textInput: TextInput,
  dateInput: DateInput,
};
const renderInput = ({
  meta: { touched, error } = {},
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    className="inputWrapper"
    error={!!(touched && error)}
    helperText={touched && error}
    variant="outlined"
    margin="normal"
    InputLabelProps={{
      classes: {
        shrink: 'veepInputLabelShrink',
        root: 'veepInputLabel b2',
      },
    }}
    inputProps={{
      className: 'veepInput',
    }}
    {...inputProps}
    {...props}
    fullWidth
  />
);
const validateUserCreation = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = ['The firstName is required'];
  }
  // if (!values.age) {
  //     errors.age = ['The age is required'];
  // } else if (values.age < 18) {
  //     errors.age = ['Must be over 18'];
  // }
  return errors;
};
class ModalCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValues: {},
      disabledButton: false,
    };
  }

  close() {
    this.props.dispatch(reset('createDriver'));
    this.props.close();
  }

  save = (record, redirect = '/drivers') => {
    return new Promise((resolve, reject) => {
      this.props.crudCreate(
        this.props.resource,
        record,
        this.props.basePath,
        redirect,
        resolve,
        reject,
      );
    });
    // this.close();
  };
  componentWillReceieProps(nextProps) {
    const { show } = nextProps;

    if (!this.props.show && show) this.setState({ disabledButton: true });
    else this.setState({ disabledButton: false });
  }
  onCreate = () => {
    let self = this;
    return this.save(this.props.record).then((ret, err) => {
      if (err) {
        throw err;
      }
      self.props.dispatch(reset('createDriver'));

      self.close();
    });
  };

  onChange = (field, eventOrValue) => {};

  render() {
    const {
      classes,
      resource,
      translate,
      handleSubmit,
      valid,
      record,
      invalid,
    } = this.props;

    return (
      <Dialog
        PaperProps={{
          classes: {
            root: classes.modal,
          },
        }}
        maxWidth="lg"
        open={this.props.show}
        // onClose={this.close.bind(this)}
        className={classes.modal}
        aria-labelledby="form-dialog-title"
      >
        <form
          onSubmit={handleSubmit(this.onCreate)}
          resource="drivers"
          basePath="/drivers"
        >
          <DialogTitle id="form-dialog-title">
            {' '}
            <div className={classes.title}>
              {`${translate('text.createDriver')}`}
              <ClearIcon
                onClick={this.close.bind(this)}
                className={classes.rightIcon}
              />
            </div>
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <div className="dialog">
              <LabelField label={`${translate('text.nameDriver')}`}>
                <TextInput
                  resource={resource}
                  variant="outlined"
                  source={models.driver.fullName}
                  fullWidth={true}
                  // placeholder="Name driver"
                  //  placeholder ="Fill name driver"
                  placeholder={`${translate('placeholder.nameDriver')}`}
                />
                {/* <Field
                    name="fullname"
                    component={renderInput}
                    label={translate('label.text.nameDriver')}
                   
                  /> */}
              </LabelField>
              <LabelField label={`${translate('text.phoneDriver')}`}>
                <TextInput
                  resource={resource}
                  variant="outlined"
                  fullWidth={true}
                  // placeholder ="Fill phone driver"
                  source={models.driver.phone}
                  placeholder={` ${translate('placeholder.phoneDriver')}`}
                  // onChange={e => this.handleFieldChange("phone", e)}
                  normalize={generalizeVNPhoneNumber}
                />
              </LabelField>
              {/* <LabelField label={`${translate('text.selectVehicle')}`}>
              
                <ReactSelect
                  isRequired={true}
                  menuContainerStyle={{ zIndex: 9999999 }}
                  optionValue="id"
                  optionLabel="licence_plate"
                  urlApi="vehicles?"
                  params={{ 'filters[current_driver_id]': 'NULL' }}
                  isClearable={true}
                  source="vehicle_id"
                  optionLabelAtribute="manufacturer"
                  resource={resource}
                  onChange={this.onChange}
                  classNameOption="option-select-custom"
                  placeholder={translate('placeholder.vehicleDriver')}
                  dataProvider={this.props.dataProvider}
                  className={classes.select}
                  styles={customStyles}
                />
               
              </LabelField> */}
            </div>
          </DialogContent>
          <DialogActions className={classes.actionDialog}>
            <Button
              disabled={!(record.fullname && record.phone)}
              className={classes.buttonCreate}
              type="submit"
              variant="contained"
              color="primary"
              resource="drivers"
              basePath="/drivers"
            >
              {translate('label.button.buttonDriver')}
            </Button>
            <Button
              className={classes.buttonCancel}
              onClick={this.close.bind(this)}
              color="default"
            >
              {translate('label.button.cancel')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
ModalCreate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  translateDeco,

  reduxForm({
    form: 'createDriver',
    validate: (values, props) => {
      const errors = {};
      const { translate } = props;
      // if (!values.fullname) {
      //   errors.fullname = translate("validation.fullnameDriver");
      // }
      // if (!values.phone) {
      //   errors.phone = translate("validation.requirePhone");
      // }
      // if (!values.vehicle_id) {
      //   errors.vehicle_id = translate('ra.validation.required');
      // }
      if (!values.fullname || (values.fullname && !values.fullname.trim())) {
        errors.fullname = translate('validation.fullnameDriver');
      }
      if (
        values.fullname &&
        values.fullname.trim() &&
        !validateFullname(values.fullname.trim())
      ) {
        errors.fullname = translate('validation.failFullname');
      }
      if (values.phone && !validatePhone(values.phone)) {
        errors.phone = translate('validation.failPhone');
        // errors.phone ="Số điện thoại không đúng định dạng");

        // if (!values.re_new_password) {
        //   errors.re_new_password = translate("ra.validation.required");
        // }
      }
      return errors;
    },
  }),
  connect(
    state => ({
      record: {
        [models.driver.fullName]: selector(state, models.driver.fullName),
        [models.driver.phone]: selector(state, models.driver.phone),
        vehicle_id: selector(state, 'vehicle_id'),
      },
    }),
    { crudCreate: crudCreateAction },
  ),
  withStyles(styles),
)(ModalCreate);
