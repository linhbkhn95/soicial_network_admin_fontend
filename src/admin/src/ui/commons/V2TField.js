import React from 'react';
import { TextField } from 'react-admin';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getMap } from '~/store/selectors';
import { getOptionAC } from '~/store/actions';

export const genRemoteV2Field = (
  key,
  labelSrc = 'label',
  valueSrc = 'value',
  component = TextField,
) =>
  connect(
    state => ({ maps: getMap(state, key), component }),
    {
      fetchMaps: () => getOptionAC(key, labelSrc, valueSrc),
    },
  )(RemoteV2TField);

class RemoteV2TField extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.maps && this.props.fetchMaps) {
      this.props.fetchMaps();
    }
  }

  render() {
    const {
      valueSrc,
      labelSrc,
      maps,
      record,
      source,
      component,
      ...rest
    } = this.props;
    const RenderComponent = component || TextField;
    const value = record && source ? get(record, source) : this.props.value;
    const label = value && maps ? maps[value] : value;
    return <RenderComponent value={label} {...rest} />;
  }
}
