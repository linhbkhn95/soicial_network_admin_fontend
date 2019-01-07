import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClearIcon from '@material-ui/icons/Clear';
import LabelField from '~/ui/commons/LabelField';
import { SimpleForm } from 'react-admin';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Modal } from '@material-ui/core';
import { TextInput, DateInput, SelectInput, translate as translateDeco } from 'react-admin';
import compose from 'recompose/compose';
import SelectWithSource from '~/ui/commons/SelectWithSource';

import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    buttonCancel: {
    //   margin: theme.spacing.unit,
    border: '1px solid rgba(17, 17, 17, 0.1)',
    color:' #111111',
    fontWeight:'bold'
  },
    leftIcon: {
      marginRight: theme.spacing.unit,

    },
    dialog:{
      minWidth:'316px',
      borderRadius:'8px'
    },
    buttonCreate: {
      fontWeight:'bold',
      boxShadow: 'none'
  },
    rightIcon: {
      float: 'right',
      display: 'flex',
      cursor:'pointer',
      marginTop: '2px',
      fontSize: '24px',
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    title:{
        color:"#111111",
        fontStyle: "bold",
        fontSize: "18px",
        lineHeight: "24px",
        fontWeight: 'bold'
    },
    actionDialog:{
      justifyContent: 'end',
      marginLeft: '21px',
      marginBottom: '21px'
    },
    label:{
      fontWeight:'bold'
    }
  });
  const fieldComponents = {
    textInput: TextInput,
    dateInput: DateInput,
  };
class ModalCreate extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      fieldValues: {},
    };
  }
  close(){
      this.props.close()
  }
  handleFieldChange = (field, eventOrValue) => {
    console.log(field,eventOrValue.target.value)
    // const { preventDefault, ...numberObj } = eventOrValue;
    // const value = Object.keys(numberObj)
    //   .map(idx => numberObj[idx])
    //   .join('');
     console.log('handle Field Change ', field);
    this.setState({
      fieldValues: {
        // ...this.state.fieldValues,
        [field]: eventOrValue.target.value,
      },
    });
  };

  render() {

    const {classes,resource, translate} = this.props

    return (
     
        <Dialog
          maxWidth="lg"
          open={this.props.show}
        
          onClose={this.close.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"> <div className={classes.title}>Create driver<ClearIcon onClick={this.close.bind(this)} className={classes.rightIcon} /></div></DialogTitle>
          <DialogContent   className={classes.dialog}>
          <div className="dialog">

          <SimpleForm toolbar={null}>
            <LabelField className={classes.label} label={'Name'}>
                <TextInput
                  resource={resource}
                  variant="outlined"
                  source="fullname"
                  fullWidth={true}
                  // placeholder="Name driver"
                  //  placeholder ="Fill name driver"
                  placeholder={`${translate('placeholder.searchDriver')}`}
                />
              </LabelField>
              <LabelField label={'Phone'}>
                <TextInput
                  resource={resource}
                  variant="outlined"
                  fullWidth={true}
                  // placeholder ="Fill phone driver"
                  source='phone'
                  placeholder={` ${translate('placeholder.phoneDriver')}`}
                   onChange={e => this.handleFieldChange('phone', e)}
                />
              </LabelField>
              <LabelField label={'Vehicle'}>
                <SelectWithSource
                  resource='vehicles'
                  variant="outlined"
                  fullWidth={true}
                  defaultValue='null'
                  // placeholder ="Select vehicle"
                  source = 'branch'

                  parentValue={this.state.fieldValues['vehicle']}
                  placeholder={translate('placeholder.vehicleDriver')}
                

                  //  onChange={value => this.handleFieldChange('vehicle', value)}
                />
              </LabelField>
          </SimpleForm>
           
          </div>

          </DialogContent>
          <DialogActions className={classes.actionDialog}>
           <Button className={classes.buttonCreate} onClick={this.close.bind(this)} variant="contained" color="primary" >
            Create driver  <AddIcon className={classes.rightIcon} />
            </Button> 
            <Button className={classes.buttonCancel} onClick={this.close.bind(this)} color="default">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
ModalCreate.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default compose(
    withStyles(styles),

    translateDeco,
  )(ModalCreate);