import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { addField, translate } from 'ra-core';

import { FileInput } from './FileInput';

const styles = {
  root: {
    width: '100%',
    marginTop: 0,
  },
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
  preview: {},
  removeButton: {
    width: '100%',
    display: 'inline-block',
    position: 'relative',
    float: 'left',
    '& button': {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      minWidth: '2rem',
      opacity: 0,
    },
    '&:hover button': {
      opacity: 1,
    },
  },
};

export class ImageInput extends FileInput {
  static defaultProps = {
    ...FileInput.defaultProps,
    labelMultiple: 'ra.input.image.upload_several',
    labelSingle: 'ra.input.image.upload_single',
  };
}

export default compose(
  addField,
  translate,
  withStyles(styles),
)(ImageInput);
