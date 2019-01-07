import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classnames from 'classnames';
import {
  // ImageInput,
  FileInput,
  // ImageField,
  translate,
} from 'react-admin';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';
// import Grid from "@material-ui/core/Grid";

const IconDelete = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.595 9.48975H6.08485C5.97426 9.48975 5.86819 9.53368 5.78998 9.61188C5.71178 9.69009 5.66785 9.79615 5.66785 9.90675V20.3319C5.66785 20.7743 5.84358 21.1985 6.1564 21.5113C6.46921 21.8242 6.89348 21.9999 7.33587 21.9999H17.344C17.7864 21.9999 18.2106 21.8242 18.5235 21.5113C18.8363 21.1985 19.012 20.7743 19.012 20.3319V9.90675C19.012 9.79615 18.9681 9.69009 18.8899 9.61188C18.8117 9.53368 18.7056 9.48975 18.595 9.48975ZM10.8804 19.0809C10.8804 19.2468 10.8145 19.4059 10.6972 19.5232C10.5799 19.6405 10.4208 19.7064 10.2549 19.7064C10.089 19.7064 9.92991 19.6405 9.8126 19.5232C9.6953 19.4059 9.6294 19.2468 9.6294 19.0809V11.8875C9.6294 11.7216 9.6953 11.5625 9.8126 11.4452C9.92991 11.3279 10.089 11.262 10.2549 11.262C10.4208 11.262 10.5799 11.3279 10.6972 11.4452C10.8145 11.5625 10.8804 11.7216 10.8804 11.8875V19.0809ZM15.0505 19.0809C15.0505 19.2468 14.9846 19.4059 14.8673 19.5232C14.75 19.6405 14.5909 19.7064 14.425 19.7064C14.2591 19.7064 14.1 19.6405 13.9827 19.5232C13.8653 19.4059 13.7994 19.2468 13.7994 19.0809V11.8875C13.7994 11.7216 13.8653 11.5625 13.9827 11.4452C14.1 11.3279 14.2591 11.262 14.425 11.262C14.5909 11.262 14.75 11.3279 14.8673 11.4452C14.9846 11.5625 15.0505 11.7216 15.0505 11.8875V19.0809Z"
      fill="#203048"
      fill-opacity="0.6"
    />
    <path
      d="M19.7812 6.03788C18.699 5.53409 17.5341 5.23142 16.3434 5.14465C16.1241 4.24766 15.6101 3.45022 14.8837 2.88006C14.1574 2.3099 13.2607 2 12.3373 2C11.4139 2 10.5172 2.3099 9.79079 2.88006C9.06442 3.45022 8.55042 4.24766 8.3311 5.14465C7.17509 5.23629 6.04335 5.52543 4.98505 5.99951C4.70748 6.11719 4.46825 6.30996 4.29425 6.55616C4.12024 6.80236 4.01837 7.09222 4.00008 7.39314C3.99853 7.50364 4.01896 7.61335 4.06018 7.71589C4.1014 7.81843 4.16259 7.91175 4.24019 7.99044C4.31779 8.06913 4.41025 8.1316 4.51221 8.17425C4.61417 8.21689 4.72358 8.23884 4.83409 8.23883H19.8463C20.0653 8.23885 20.2756 8.1527 20.4316 7.99899C20.5877 7.84528 20.677 7.63635 20.6803 7.41733C20.6736 7.12651 20.586 6.84331 20.4271 6.59961C20.2683 6.3559 20.0446 6.16136 19.7812 6.03788ZM12.321 3.66845C12.7716 3.6597 13.2156 3.77774 13.6024 4.0091C13.9892 4.24047 14.3032 4.57585 14.5086 4.97701C13.0642 4.89281 11.6161 4.89281 10.1718 4.97701C10.3704 4.57864 10.6775 4.24446 11.0578 4.01296C11.438 3.78145 11.8759 3.66204 12.321 3.66845Z"
      fill="#203048"
      fill-opacity="0.6"
    />
  </svg>
);

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

const FileIcon = props => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.5 -0.5H21.5V17.5C21.5 21.3523 18.3523 24.5 14.5 24.5H2.5V-0.5ZM4.5 1.5V22.5H14.5C17.2477 22.5 19.5 20.2477 19.5 17.5V1.5H4.5Z"
        fill="#006DBA"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 8.5H8V6.5H16V8.5Z"
        fill="#006DBA"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 12.5H8V10.5H16V12.5Z"
        fill="#006DBA"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 16.5H8V14.5H14V16.5Z"
        fill="#006DBA"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

@withStyles({
  list: {
    display: 'flex',
    listStyleType: 'none',
  },
  image: {
    margin: '0.5rem',
  },
})
class FileField extends React.Component {
  static propTypes = {
    refForWidth: PropTypes.any,
    addLabel: PropTypes.bool,
    basePath: PropTypes.string,
    className: PropTypes.string,
    cellClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    classes: PropTypes.object,
    record: PropTypes.object,
    sortBy: PropTypes.string,
    source: PropTypes.string.isRequired,
    src: PropTypes.string,
    title: PropTypes.string,
  };

  render() {
    const {
      className,
      classes = {},
      record,
      source,
      src,
      title,
      refForWidth,
    } = this.props;

    console.log('----------------------------');
    console.log(record, 'aacac');
    console.log('----------------------------');

    const sourceValue = get(record, source);
    if (!sourceValue) {
      return <span className={className} />;
    }

    if (Array.isArray(sourceValue)) {
      return (
        <ul className={classnames(classes.list, className)}>
          {sourceValue.map((file, index) => {
            const titleValue = get(file, title) || title;
            // const srcValue = get(file, src) || title;

            return <li key={index}>{titleValue}</li>;
          })}
        </ul>
      );
    }

    const titleValue = get(record, title) || title;

    return (
      <span ref={refForWidth} className={className}>
        <span
          style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            marginBottom: '-10px',
            transform: ' translate(0,5px)',
            marginRight: '7px',
          }}
        >
          <FileIcon />
        </span>{' '}
        <span
          style={{
            color: '#006DBA',
          }}
        >
          {titleValue}
        </span>
      </span>
    );
  }
}

@compose(
  withStyles(styles),
  translate,
)
export default class FileInputCustomize extends Component {
  static state = {
    dropZoneHeight: 0,
  };

  refForWidth = React.createRef();

  render() {
    const {
      //  label,
      translate,
      source,
      classes,
      record,
      titleValue,
    } = this.props;
    let _titleValue = translate('label.upload.imageScan');
    if (titleValue) {
      _titleValue = titleValue(record, translate);
    }

    return (
      <FileInput
        classes={{
          dropZone: 'dropZone-custom',
        }}
        IconDeleteButton={
          <div
            style={{
              transform: 'translate(0, -3px)',
            }}
          >
            <IconDelete />
          </div>
        }
        placeholderClass={classes.placeholder}
        labelHeaderClass={classes.labelHeader}
        previewClassname={classes.preview}
        fileInputPreviewClassname={classes.fileInputPreview}
        source={source}
        label={
          <div className={classes.label}>
            <IconUpload className={classes.rightIcon} />
            {_titleValue}
          </div>
        }
        accept="application/pdf"
        labelSingle=""
      >
        <FileField source="src" title="title" />
      </FileInput>
    );
  }
}
