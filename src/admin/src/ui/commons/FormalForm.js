import React from 'react';
import {
  TextInput,
  DateInput,
  RadioButtonGroupInput,
  translate,
} from 'react-admin';

import LabelField from '~/ui/commons/LabelField';
import InputPassword from '~/ui/commons/input/InputPassword';
import withStyles from '@material-ui/core/styles/withStyles';
import SelectWithSource, {
  RemoteSelectWithSource,
} from '~/ui/commons/SelectWithSource';
import compose from 'recompose/compose';
import { generalizeVNPhoneNumber } from '~/ui/commons/MaskedInputGen';
import RemoteSelect from './input/RemoteSelect';


const fieldComponents = {
  textInput: TextInput,
  dateInput: DateInput,
  selectInput: SelectWithSource,
  radioInput: withStyles({ label: { display: 'none' } })(props => (
    <RadioButtonGroupInput {...props} />
  )),
  reactSelect:props => (<RemoteSelect {...props} />),
  passwordInput: props => (
    <InputPassword
      inputContainerProps={{ style: { boxSizing: 'border-box' } }}
      inputProps={{ className: 'input-password-field' }}
      {...props}
    />
  ),
  selectInputWithSource: {
    'vehicle-marks': RemoteSelectWithSource('vehicle-marks', 'title', 'code'),
    'vehicle-models': RemoteSelectWithSource('vehicle-models', 'title', 'code'),
    'vehicle-colors': RemoteSelectWithSource('vehicle-colors', 'title', 'code'),
    'vehicle-seats': RemoteSelectWithSource('vehicle-seats', 'title', 'value'),
    fleets: RemoteSelectWithSource('fleets', 'name', 'id'),
  },
};

const styles = {
  formHeader: {},
  subtitle: {},
};

@compose(
  translate,
  withStyles(styles),
)
export default class FormalForm extends React.Component {
  state = {
    fieldValues: {},
  }

  handleFieldChange = (field, eventOrValue) => {
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
      dataProvider,
    } = this.props;

    const { numOrder, header, subtitle, fields } = formMeta;
    return (
      <React.Fragment>
        {resource == 'users' ? (
          <h3>{translate(header)}</h3>
        ) : (
          <h3>
            {`${
              overrideOrder !== undefined ? overrideOrder : numOrder
            }${translate(header)}`}
          </h3>
        )}
        <div className={`${classes.subtitle}`}>{`${translate(subtitle)}`}</div>
        {fields.map(
          ({
            source,
            type,
            placeholder,
            label,
            parentSrc,
            normalize,
            remoteSrc,
            parentPath,
            readOnly,
            choices,
            ...rest
          } = {}) => {
            //const FieldComponent = fieldComponents[type] || TextInput;
            const FieldComponent = remoteSrc
              ? fieldComponents['selectInputWithSource'][remoteSrc]
              : fieldComponents[type] || TextInput;

            const fieldInput =
              //<FieldComponent
              //   readOnly={readOnly}
              //   resource={resource}
              //   source={source}
              //   variant="outlined"
              //   fullWidth={true}
              //   normalize={normalize}
              //   parentSrc={parentSrc}
              //   parentValue={this.state.fieldValues[parentSrc]}
              //   parentPath={parentPath}
              //   placeholder={translate(placeholder)}
              //   choices={choices}
              //   onChange={value => this.handleFieldChange(source, value)}
              //   {...rest}
              // />
              source == 'phone' ? (
                <FieldComponent
                  readOnly={readOnly}
                  resource={resource}
                  source={source}
                  variant="outlined"
                  fullWidth={true}
                  // normalize={normalize}
                  parentSrc={parentSrc}
                  parentValue={this.state.fieldValues[parentSrc]}
                  parentPath={parentPath}
                  placeholder={translate(placeholder)}
                  normalize={generalizeVNPhoneNumber}
                  onChange={value => this.handleFieldChange(source, value)}
                  {...rest}
                />
              ) : (
                <FieldComponent
                  readOnly={readOnly}
                  resource={resource}
                  source={source}
                  variant="outlined"
                  fullWidth={true}
                  dataProvider={dataProvider}
                  normalize={normalize}
                  parentSrc={parentSrc}
                  parentValue={this.state.fieldValues[parentSrc]}
                  parentPath={parentPath}
                  placeholder={translate(placeholder)}
              
                  onChange={value => this.handleFieldChange(source, value)}
                  {...rest}
                  choices={choices}
                />
              );
            return (
              <LabelField label={label} key={source}>
                {fieldInput}
              </LabelField>
            );
          },
        )}
      </React.Fragment>
    );
  }
}
