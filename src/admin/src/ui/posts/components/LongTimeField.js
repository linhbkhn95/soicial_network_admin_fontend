import React from 'react';
// import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
// import Tooltip from '@material-ui/core/Tooltip';
import { getStatus } from '~/utils/statusUtils';

const humanizeDuration = require('humanize-duration');
const styles = theme => ({
  avatar: {
    marginRight: 10,
  },
  pictureContainer: {
    position: 'relative',
  },
  statusInd: {
    position: 'absolute',
    bottom: -1,
    right: 9,
  },
  icon: {
    // margin: theme.spacing.unit,
    fontSize: 28,
    color: 'rgb(255, 228, 1)',
    float: 'left',
  },
  valueRate: {
    float: 'right',
    marginTop: '4px',
    fontSize: '14px',
  },
});

@withStyles(styles)
export default class LongTimeField extends React.Component {
  caculateLongTime() {
    // let {record} = this.props
    // var d = record.runtime
    // var hours = Math.floor(d.asHours());
    // var mins = Math.floor(d.asMinutes()) - hours * 60;
  }
  render() {
    let { classes, record, source } = this.props;
    let runtime = record[source];
    let longtime = 0;
    let driverStatus = get(record, 'status');
    let documentStatus = get(record, 'document_status');
    let statusCode = getStatus(documentStatus, driverStatus);
    humanizeDuration(12000); // '12 seconds'
    if (runtime != null)
      longtime = humanizeDuration(parseInt(runtime * 1000), {
        round: true,
        language: 'vi',
        units: ['d', 'h', 'm'],
      });
    if (statusCode == 5) return null;
    return (
      <div className="d-flex flex-row align-items-center">
        {longtime ? longtime : ''}
      </div>
    );
  }
}