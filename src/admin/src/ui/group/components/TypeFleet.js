import React from 'react';
import { translate as translateDeco } from 'react-admin';

let listType = {
  1: 'Cá nhân',
  2: 'Doanh nghiệp',
};

class TypeFleet extends React.Component {
  render() {
    let { record, source } = this.props;
    let type = record[source];
    let conextTypeFleetFleet = listType[type] || '';
    return (
      <div className="d-flex flex-row align-items-center">
        {conextTypeFleetFleet}
      </div>
    );
  }
}

export default translateDeco(TypeFleet);
