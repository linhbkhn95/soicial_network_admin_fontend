import React from 'react';
import get from 'lodash/get';
import { genRemoteV2Field } from '~/ui/commons/V2TField';
import withStyles from '@material-ui/core/styles/withStyles';
import { TextField } from 'react-admin';
import DateAlertField from './DateAlertField';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    paddingTop: 12,
    paddingBottom: 12,
    '&:last-child': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
  },
  label: {
    fontSize: 16,
    lineHeight: '25px',
    color: 'rgba(32, 48, 72, 0.8)',
  },
  content: {
    fontSize: 16,
    lineHeight: '24px',
    color: '#203048',
    fontWeight: 600,
  },
};

const RepresentFields = {
  text: TextField,
  date: DateAlertField,
};

@withStyles(styles)
export default class TextShow extends React.Component {
  constructor(props) {
    super(props);
    const { mapSrc, mapLabelSrc, mapValueSrc, contentType } = props;
    const RepresentField = get(RepresentFields, contentType, TextField);
    this.RenderField = RepresentField;

    if (mapSrc && mapLabelSrc && mapValueSrc) {
      this.RenderField = genRemoteV2Field(
        mapSrc,
        mapLabelSrc,
        mapValueSrc,
        RepresentField,
      );
    }
  }

  render() {
    const { record, source, resource, classes, label } = this.props;
    return (
      <div className={classes.root}>
        <span className={classes.label}>{label}</span>
        {React.createElement(this.RenderField, {
          record,
          source,
          resource,
          className: classes.content,
        })}
      </div>
    );
  }
}
