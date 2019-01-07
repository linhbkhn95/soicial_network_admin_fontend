import React, { Component } from 'react';
import ReactSelect from '~/ui/commons/ReactSelect';
import { translate as translateDeco } from 'react-admin';

const customStyles = {
  option: (base, state) => ({
    ...base,
    zIndex: '10000000000',
  }),
  menu: base => ({
    ...base,
    // none of react-selects styles are passed to <View />
    zIndex: '10000000000',
    border: '1px solid yellow',
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

@translateDeco
export default class RemoteSelect extends Component {
  static defaultProps = {
    urlApi: 'fleets?',
    resource: 'fleets',
    isClearable: true,
    isRequired: true,
    optionValue: 'id',
    optionLabel: 'name',
    params: {},
    classNameOption: 'option-select-custom',
  };

  render() {
    const { translate, dataProvider, ...props } = this.props;
    return (
      <ReactSelect
        menuContainerStyle={{ zIndex: 9999999, border: '1px solid red' }}
        noOptionsMessage={() => translate('text.no_options')}
        {...props}
        //  placeholder={translate('placeholder.vehicleDriver')}
        dataProvider={dataProvider}
        // className={classes.select}
        styles={customStyles}
      />
    );
  }
}
