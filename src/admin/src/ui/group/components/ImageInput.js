import React, { Component } from 'react';
import objectPath from 'object-path';
import {
  // ImageInput,
  FileInput,
  ImageField,
  translate,
} from 'react-admin';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
// import Grid from "@material-ui/core/Grid";
import TrashIcon from '@material-ui/icons/Delete';

const IconUpload = props => (
  <div className={props.className}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.5 15V18C3.5 19.0074 4.45739 20 5.8 20H18.2C19.5426 20 20.5 19.0074 20.5 18V15H22.5V18C22.5 20.2926 20.4574 22 18.2 22H5.8C3.54262 22 1.5 20.2926 1.5 18V15H3.5Z"
        fill="#203048"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 3V17H11V3H13Z"
        fill="#203048"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.0001 1.58594L17.7072 7.29304L16.293 8.70726L12.0001 4.41436L7.70718 8.70726L6.29297 7.29304L12.0001 1.58594Z"
        fill="#203048"
      />
    </svg>
  </div>
);
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageBox: {
    paddingRight: 8,
  },
  preview: {
    position: 'absolute',
    top: -8,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'white',
    zIndex: 99,
  },
  fileInputPreview: {
    width: '100%',
    height: 'auto',
  },
  placeholder: {
    fontSize: 14,
  },
  labelHeader: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '24px',
    color: '#000000',
  },
  imageFieldImg: {
    width: '100%',
    height: '100%',
    margin: 0,
    display: 'block',
  },
  imageField: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  imageInput: {},
  rightIcon: {
    marginRight: theme.spacing.unit,
  },
  label: {
    display: 'flex',

    fontSize: '14px',
    lineHeight: '20px',
    alignItems: 'center',
    color: '#203048',
    fontWeight: '400',
    fontFamily: 'IBM Plex Sans',
  },
  dropZone: {
    background: 'white',
  },
});

class InputImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropZoneHeight: 0,
    };
    this.refForWidth = React.createRef();
  }

  componentDidMount() {
    this.setState({
      // dropZoneHeight: this.refForWidth.current.clientWidth,
    });
  }

  render() {
    const {
      //  label,
      translate,
      source,
      classes,
      record,
    } = this.props;
    return (
      <React.Fragment>
        {/* <ImageInput
            source={source}
            label={label}
            accept="image/*"
            placeholderClass={classes.placeholder}
            labelHeaderClass={classes.labelHeader}
            previewClassname={classes.preview}
            fileInputPreviewClassname={classes.fileInputPreview}
            // width={this.state.dropZoneHeight}
            // refForWidth={idx === 0 ? this.refForWidth : null}
          >
            <ImageField
              source="src"
              title="title"
              imgClassName={classes.imageFieldImg}
              className={classes.imageField}
            />
          </ImageInput> */}
        <FileInput
          classes={{
            dropZone: 'dropZone-custom',
          }}
          IconDeleteButton={<TrashIcon />}
          placeholderClass={classes.placeholder}
          labelHeaderClass={classes.labelHeader}
          previewClassname={classes.preview}
          fileInputPreviewClassname={classes.fileInputPreview}
          source={source}
          label={
            <div className={classes.label}>
              {/* <CloudUploadIcon className={classes.rightIcon} /> */}
              <IconUpload className={classes.rightIcon} />
              {translate('label.upload.imageScan')}
            </div>
          }
          accept="application/pdf"
          labelSingle=""
        >
          <ImageField source="src" title="title" />
        </FileInput>
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  translate,
)(InputImage);
