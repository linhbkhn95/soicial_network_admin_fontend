import React from 'react';
import {
  TextInput,
  NumberInput,
  DateInput,
  SelectInput,
  translate,
} from 'react-admin';
import LabelField from '~/ui/commons/LabelField';
import withStyles from '@material-ui/core/styles/withStyles';
import SelectWithSource, {
  RemoteSelectWithSource,
} from '~/ui/commons/SelectWithSource';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import ImageInput from './ImageInput';
import FileInput from './FileInput';
import InputNumber from '~/ui/commons/input/InputNumber';
import InputInteger from '../../commons/input/InputInteger';
import { doDuring } from 'async';

const fieldComponents = {
  textInput: TextInput,
  dateInput: DateInput,
  number: InputNumber,
  integer: InputInteger,
  imageInput: ImageInput,
  fileInput: FileInput,
  selectInput: SelectWithSource,
  selectInputWithSource: {
    'vehicle-marks': RemoteSelectWithSource('vehicle-marks', 'title', 'code'),
    'vehicle-models': RemoteSelectWithSource('vehicle-models', 'title', 'code'),
    'vehicle-colors': RemoteSelectWithSource('vehicle-colors', 'title', 'code'),
    'vehicle-seats': RemoteSelectWithSource('vehicle-seats', 'title', 'value'),
  },
};

const styles = {
  formHeader: {},
  subtitle: {},
};

@translate
@withStyles(styles)
export default class FormalForm extends React.Component {
  state = {
    fieldValues: {},
  };

  handleFieldChange = field => eventOrValue => {
    const { preventDefault, ...numberObj } = eventOrValue;
    const value = Object.keys(numberObj)
      .map(idx => numberObj[idx])
      .join('');

    this.setState({
      fieldValues: {
        ...this.state.fieldValues,
        [field]: value,
      },
    });
  };

  render() {
    const {
      formMeta = {},
      translate,
      classes,
      overrideOrder,
      resource,
      fullWidth,
      record,
    } = this.props;

    const { numOrder, header, subtitle, fields, inline } = formMeta;
    return (
      <React.Fragment>
        <h3>
          {`${
            overrideOrder !== undefined ? overrideOrder : numOrder
          }. ${translate(header)}`}
        </h3>
        {subtitle ? (
          <div className={`${classes.subtitle}`}>{`${translate(
            subtitle,
          )}`}</div>
        ) : null}
        <Grid container={inline} spacing={inline ? 24 : null} md={12}>
          {fields.map(
            (
              {
                source,
                type,
                placeholder,
                label,
                hiddenLabel,
                parentSrc,
                normalize,
                remoteSrc,
                parentPath,
                readOnly,
                labelNoteField,
                format,
                parse,
                ...rest
              } = {},
              index,
            ) => {
              //const FieldComponent = fieldComponents[type] || TextInput;
              const FieldComponent = remoteSrc
                ? fieldComponents['selectInputWithSource'][remoteSrc]
                : fieldComponents[type] || TextInput;

              const fieldInput = (
                <FieldComponent
                  record={record}
                  readOnly={readOnly}
                  resource={resource}
                  source={source}
                  variant="outlined"
                  fullWidth={true}
                  normalize={normalize}
                  parentSrc={parentSrc}
                  parentValue={this.state.fieldValues[parentSrc]}
                  parentPath={parentPath}
                  placeholder={translate(placeholder)}
                  onChange={this.handleFieldChange(source)}
                  format={format}
                  parse={parse}
                  {...rest}
                />
              );

              if (inline) {
                return (
                  <Grid item md={4} lg={4} sm={12}>
                    <LabelField
                      hiddenLabel={hiddenLabel}
                      label={label}
                      key={source}
                    >
                      {fieldInput}
                    </LabelField>
                    {labelNoteField ? (
                      <div>{translate(labelNoteField)}</div>
                    ) : null}
                  </Grid>
                );
              }

              return (
                <Grid key={String(index)} item md={12} lg={12} sm={12}>
                  <LabelField
                    hiddenLabel={hiddenLabel}
                    label={label}
                    key={source}
                  >
                    {fieldInput}
                  </LabelField>
                  {labelNoteField ? (
                    <div className="note-text-field">
                      {translate(labelNoteField)}
                    </div>
                  ) : null}
                </Grid>
              );
            },
          )}
        </Grid>
      </React.Fragment>
    );
  }
}
