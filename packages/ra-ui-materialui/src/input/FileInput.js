import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual } from 'recompose';
import Dropzone from 'react-dropzone';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { addField, translate } from 'ra-core';

import Labeled from './Labeled';
import FileInputPreview from './FileInputPreview';
import sanitizeRestProps from './sanitizeRestProps';

const styles = {
  dropZone: {
    background: '#efefef',
    cursor: 'pointer',
    padding: '1rem',
    textAlign: 'center',
    color: '#999',
    height: '100%',
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    border: '1px dashed #D2D6DA',
    borderRadius: '4px',
  },
  labelBold: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 24,
    color: '#000000',
  },
  preview: {
    height: '100%',
  },
  removeButton: {
    height: '100%',
  },
  root: { width: '100%' },
};

export class FileInput extends Component {
  static propTypes = {
    accept: PropTypes.string,
    children: PropTypes.element,
    classes: PropTypes.object,
    className: PropTypes.string,
    disableClick: PropTypes.bool,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    labelMultiple: PropTypes.string,
    labelSingle: PropTypes.string,
    labelClass: PropTypes.string,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    multiple: PropTypes.bool,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    translate: PropTypes.func.isRequired,
    placeholder: PropTypes.node,
  };

  static defaultProps = {
    labelMultiple: 'ra.input.file.upload_several',
    labelSingle: 'ra.input.file.upload_single',
    multiple: false,
    onUpload: () => {},
  };

  constructor(props) {
    super(props);
    let files = props.input.value || [];
    if (!Array.isArray(files)) {
      files = [files];
    }

    this.state = {
      files: files.map(this.transformFile),
    };
  }

  componentWillReceiveProps(nextProps) {
    let files = nextProps.input.value || [];
    if (!Array.isArray(files)) {
      files = [files];
    }

    this.setState({ files: files.map(this.transformFile) });
  }

  onDrop = files => {
    const updatedFiles = this.props.multiple
      ? [...this.state.files, ...files.map(this.transformFile)]
      : [...files.map(this.transformFile)];

    this.setState({ files: updatedFiles });

    if (this.props.multiple) {
      this.props.input.onChange(updatedFiles);
    } else {
      this.props.input.onChange(updatedFiles[0]);
    }
  };

  onRemove = file => () => {
    const filteredFiles = this.state.files.filter(
      stateFile => !shallowEqual(stateFile, file),
    );

    this.setState({ files: filteredFiles });

    if (this.props.multiple) {
      this.props.input.onChange(filteredFiles);
    } else {
      this.props.input.onChange(null);
    }
  };

  // turn a browser dropped file structure into expected structure
  transformFile = file => {
    if (!(file instanceof File)) {
      return file;
    }

    const { source, title } = React.Children.toArray(
      this.props.children,
    )[0].props;

    const transformedFile = {
      rawFile: file,
      [source]: file.preview,
    };

    if (title) {
      transformedFile[title] = file.name;
    }

    return transformedFile;
  };

  label = () => {
    const {
      translate,
      label,
      labelMultiple,
      labelSingle,
      labelHeaderClass,
      placeholderClass,
      classes,
    } = this.props;
    if (this.props.multiple) {
      return (
        <React.Fragment>
          {label && (
            <div className={`${labelHeaderClass}`}>{translate(label)}</div>
          )}
          <p className={placeholderClass}>{translate(labelMultiple)}</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {label && (
          <div className={`${labelHeaderClass}`}>{translate(label)}</div>
        )}
        <p className={placeholderClass}>{translate(labelSingle)}</p>
      </React.Fragment>
    );
  };

  render() {
    const {
      accept,
      children,
      classes = {},
      className,
      disableClick,
      isRequired,
      label,
      maxSize,
      minSize,
      multiple,
      resource,
      source,
      options,
      previewClassname,
      fileInputPreviewClassname,
      previewStyle,
      labelClass = '',
      width,
      IconDeleteButton,
      ...rest
    } = this.props;

    return (
      <Labeled
        label={label}
        className={classnames(classes.root, className)}
        source={source}
        resource={resource}
        isRequired={isRequired}
        width={width}
        refForWidth={this.refForWidth}
        {...sanitizeRestProps(rest)}
      >
        <span>
          <Dropzone
            onDrop={this.onDrop}
            accept={accept}
            disableClick={disableClick}
            maxSize={maxSize}
            minSize={minSize}
            multiple={multiple}
            className={classes.dropZone}
            {...options}
          >
            {this.label()}
          </Dropzone>
          {children &&
            this.state.files.length > 0 && (
              <div
                className={`previews ${previewClassname}`}
                style={previewStyle}
              >
                {this.state.files.map((file, index) => (
                  <FileInputPreview
                    key={index}
                    file={file}
                    IconDeleteButton={IconDeleteButton}
                    onRemove={this.onRemove(file)}
                    className={`${
                      classes.removeButton
                    } ${fileInputPreviewClassname}`}
                  >
                    {React.cloneElement(children, {
                      record: file,
                    })}
                  </FileInputPreview>
                ))}
              </div>
            )}
        </span>
      </Labeled>
    );
  }
}

export default compose(
  addField,
  translate,
  withStyles(styles),
)(FileInput);
