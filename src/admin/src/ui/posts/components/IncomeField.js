import React from 'react';
import get from 'lodash/get';
import { getStatus } from '~/utils/statusUtils';
import { translate as translateDeco } from 'react-admin';
import { NumberField } from 'react-admin';

@translateDeco
export default class IncomeField extends React.Component {
  render() {
    let { record, source } = this.props;
    // let { runtime } = record;
    let driverStatus = get(record, 'status');
    let documentStatus = get(record, 'document_status');
    let statusCode = getStatus(documentStatus, driverStatus);

    if (statusCode == 5) return <div />;
    // return  <TextField  {...this.props} record={vehicle} suffix={` ${translate("text.seats")}`} />;
    return (
      <NumberField
        source={source}
        locales="vi"
        options={{ style: 'currency', currency: 'VND' }}
        sortable={false}
      />
    );
  }
}
