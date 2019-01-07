import React from 'react';
import { DateField } from 'react-admin';

export default class CustomizeDateField extends React.Component {
  render() {
    const { props } = this;
    return <DateField {...props} />;
  }
}
