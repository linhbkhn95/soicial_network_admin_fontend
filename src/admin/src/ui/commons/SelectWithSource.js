import React from 'react';
import { SelectInput } from 'react-admin';
import { models } from 'data-generator';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getOption } from '~/store/selectors';
import { getOptionAC } from '~/store/actions';

export const RemoteSelectWithSource = (key, labelSrc, valueSrc) =>
  connect(
    state => ({
      choices: getOption(state, key),
      remote: true,
      labelSrc,
      valueSrc,
    }),
    { fetchChoices: () => getOptionAC(key, labelSrc, valueSrc) },
)(SelectWithSource);

export default class SelectWithSource extends React.Component {
  state = {
    value: 1,
  }

  componentDidMount() {
    this.setState({ value: 1 });
    if (this.props.remote && !this.props.choices && this.props.fetchChoices) {
      this.props.fetchChoices();
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('nextPRops', nextProps);
  // }

  render() {
    // console.log('render SelectWithSource');
    const {
      source,
      resource,
      type,
      remote,
      parentValue,
      parentPath,
      valueSrc,
      labelSrc,
      parentSrc,
      choices,
      placeholder,
      filterWithParentValue,
      value,
      ...rest
    } = this.props;
    let rawChoices = (options[resource] && options[resource][source]) || [];
    if (remote) {
      rawChoices = choices || [];
    }
    if (parentSrc) {
      rawChoices = rawChoices.filter(
        val =>
          typeof filterWithParentValue === 'function'
            ? filterWithParentValue(val, parentValue)
            : get(val, parentPath) === parentValue,
      );
    }
    let selectInputChoices = rawChoices;
    if (valueSrc || labelSrc) {
      selectInputChoices = rawChoices.map(rawChoice => ({
        ...rawChoice,
        label: labelSrc ? rawChoice[labelSrc] : rawChoice.label,
        value: valueSrc ? rawChoice[valueSrc] : rawChoice.value,
      }));
    }
    return (
      <SelectInput
        choices={selectInputChoices}
        source={source}
        optionText="label"
        optionValue="value"
        // value = {this.state?this.state.value:1}
        {...rest}
        placeholder={placeholder}
      />
    );
  }
}

const options = {
  fleets: {
    [models.fleet.type]: [
      {
        label: 'Cá nhân',
        value: 1,
      },
      {
        label: 'Doanh nghiệp',
        value: 2,
      },
    ],
    [models.fleet.city_bank]: [
      {
        label: 'Hà Nội',
        value: 29,
      },
      {
        label: 'Hồ  Chí Minh',
        value: 30,
      },
    ],
    [models.fleet.branch]: [
      {
        label: 'Quận 1',
        value: 1,
      },
      {
        label: 'Quận 3',
        value: 2,
      },
    ],
  },
  vehicles: {
    [models.vehicle.branch]: [
      {
        label: 'Toyota',
        value: 'toyota',
      },
      {
        label: 'Mazda',
        value: 'mazda',
      },
      {
        label: 'Honda',
        value: 'honda',
      },
      {
        label: 'Mercesdes',
        value: 'mercesdes',
      },
      {
        label: 'Vinfast',
        value: 'vinfast',
      },
      {
        label: 'Nissan',
        value: 'nissan',
      },
    ],
    [models.vehicle.subBranch]: [
      {
        label: 'Camry',
        value: 'camry',
        parent: 'toyota',
      },
      {
        label: 'Vios',
        value: 'vios',
        parent: 'toyota',
      },
      {
        label: 'Lexus',
        value: 'lexus',
        parent: 'toyota',
      },
      {
        label: 'Fortuner',
        value: 'fortuner',
        parent: 'toyota',
      },
      {
        label: 'Yaris',
        value: 'yaris',
        parent: 'toyota',
      },
      {
        label: 'Avalon',
        value: 'avalon',
        parent: 'toyota',
      },
      {
        label: 'Highlander',
        value: 'highlander',
        parent: 'toyota',
      },
      {
        label: 'Mazda 2',
        value: 'mazda_2',
        parent: 'mazda',
      },
      {
        label: 'Mazda 3',
        value: 'mazda_3',
        parent: 'mazda',
      },
      {
        label: 'Mazda CX5',
        value: 'mazda_cx5',
        parent: 'mazda',
      },
      {
        label: 'Mazda CX6',
        value: 'mazda_cx6',
        parent: 'mazda',
      },
      {
        label: 'Civic',
        value: 'civic',
        parent: 'honda',
      },
      {
        label: 'Acura',
        value: 'acura',
        parent: 'honda',
      },
      {
        label: 'C200',
        value: 'mes_c200',
        parent: 'mercesdes',
      },
      {
        label: 'C250',
        value: 'mes_c250',
        parent: 'mercesdes',
      },
      {
        label: 'C200',
        value: 'mes_c300',
        parent: 'mercesdes',
      },
      {
        label: 'LUX A20',
        value: 'lux_a20',
        parent: 'vinfast',
      },
      {
        label: 'LUX SA20',
        value: 'lux_sa20',
        parent: 'vinfast',
      },
      {
        label: 'X-trail',
        value: 'x_trail',
        parent: 'nissan',
      },
      {
        label: 'Teana',
        value: 'teana',
        parent: 'nissan',
      },
    ],
    [models.vehicle.colour]: [
      {
        label: 'label.color.red',
        value: 'red',
      },
      {
        label: 'label.color.blue',
        value: 'red',
      },
      {
        label: 'label.color.green',
        value: 'green',
      },
      {
        label: 'label.color.black',
        value: 'black',
      },
      {
        label: 'label.color.white',
        value: 'white',
      },
    ],
    [models.vehicle.seat]: [
      {
        label: '2',
        value: 2,
      },
      {
        label: '4',
        value: 4,
      },
      {
        label: '7',
        value: 7,
      },
    ],
    [models.vehicle.year]: [
      {
        label: '2010',
        value: 2010,
      },
      {
        label: '2011',
        value: 2011,
      },
      {
        label: '2012',
        value: 2012,
      },
    ],
  },
};
