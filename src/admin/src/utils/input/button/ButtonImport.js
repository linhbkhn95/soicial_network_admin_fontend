import React, { Component } from 'react';
import { CREATE } from 'react-admin';
import dataProviderFactory from '~/dataProvider';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Icon from '@material-ui/core/Icon';
import * as XLSX from 'xlsx';
import axios from 'axios';


const columnsName = ["NAME", "FULLNAME", "EMAIL", "SDT", "BIRTHDATE"]
const typeColumns = ['VARCHAR', 'NVARCHAR', 'VARCHAR', 'VARCHAR', 'VARCHAR']
var getKeys = function (obj) {
  var keys = [];
  for (var key in obj) {
      keys.push(key);
  }
  return keys;
}
const sanitizeRestProps = ({ ...rest }) => rest;
const styles = theme => ({
    button: {
    //   margin: theme.spacing.unit,
      background:'white'
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    },
    upload: {
        cursor: 'pointer',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        width: '100%',
        opacity: '0'
        }
  });

class ImportButton extends Component {
    static propTypes = {};

    constructor(props) {
      super(props)
      this.state = {
          showModal: false,
          fileName: '',
          file: null,
          dataTable: null,
          fileMasterArr: [],
          columnsName: [],
          columnNames: [],
          filemap: null,
          typeColumn: {},
          err_msg: {},
          dataProvider: null,
      }
    }
   _handleChange(e) {
      e.preventDefault();
      let file = e.target.files[0];
      var fileName = file.name;
      this.setState({ file: e.target.files[0], fileName })
      this.uploadFile(file).then((response)=>{
                  // if(response.data.EC==0){
                  //       toast.success('Thành công', {
                  //                     position: toast.POSITION.TOP_CENTER
                  //                 });

                  //   }
      })

    }
    uploadFile(file) {
      const formData = new FormData();
      formData.append('file', file);
      const resource =this.props.resource;
      const url = resource + '/import';

      console.log('type file',file.type);
      // if(this.props.dataProvider)
      //   return this.props.dataProvider(CREATE,url, { data: formData });
      // return axios.post(url,formData,config)
    } 
    render() {
        const {classes, label, ...rest} = this.props;

        return (
            <Button variant="contained" color="default" className={classes.button}>
              Import
              {/* accept=".csv,xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" */}
              <input onChange={this._handleChange.bind(this)} title="Chọn file import"  id="imageButton" class={classes.upload} type="file" />

            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
            
        );
    }
}
ImportButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
ImportButton.defaultProps = {
    label: 'ra.action.import',
}

export default  withStyles(styles)(connect()(ImportButton));
