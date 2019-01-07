import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { getStatus } from '~/utils/statusUtils';
import { translate as translateDeco } from 'react-admin';

@translateDeco
export default class SeatField extends React.Component {
  static propTypes = {
    record: PropTypes.object,
    translate: PropTypes.func,
    // source: PropTypes.string,
  };
  render() {
    const { record, translate } = this.props;
    // let { runtime } = record;
    const driverStatus = get(record, 'status');
    const documentStatus = get(record, 'document_status');
    const statusCode = getStatus(documentStatus, driverStatus);
    const vehicle = get(record, 'vehicle');
    const seatText = vehicle ? vehicle.seat : '';
    // let html = (
    //   <div>
    //     {seatText} {translate('text.seats')}{' '}
    //   </div>
    // );

    if (statusCode == 5 && !vehicle) return <div />;

    // return  <TextField  {...this.props} record={vehicle} suffix={` ${translate("text.seats")}`} />;
    return (
      <div>
        {' '}
        {seatText} {translate('text.seats')}
      </div>
    );
  }
}
