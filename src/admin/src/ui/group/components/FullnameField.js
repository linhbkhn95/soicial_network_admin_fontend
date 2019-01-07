import React from 'react';
// import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import get from 'lodash/get';
// import Tooltip from '@material-ui/core/Tooltip';
// import { getStatus } from '~/utils/statusUtils';

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
export default class FullnameField extends React.Component {
  convertName(fullname) {
    if (fullname && fullname.length > 30)
      return fullname.substring(0, 30) + '...';
    return fullname;
  }
  render() {
    let { classes, record, source } = this.props;
    let fullname = record[source];
    return (
      <div title={fullname} className="d-flex flex-row align-items-center">
        {this.convertName(fullname)}
      </div>
    );
  }
}
