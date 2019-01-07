import React from 'react';
// import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import get from 'lodash/get';
// import Tooltip from '@material-ui/core/Tooltip';

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
class LongTimeField extends React.Component {
  caculateLongTime() {
    // let {record} = this.props
    // var d = record.runtime
    // var hours = Math.floor(d.asHours());
    // var mins = Math.floor(d.asMinutes()) - hours * 60;
  }
  render() {
    let { classes, record } = this.props;
    let { runtime } = record;

    humanizeDuration(12000); // '12 seconds'
    let longtime = humanizeDuration(parseInt(runtime) * 1000, {
      round: true,
      language: 'vi',
      units: ['d', 'h', 'm'],
    });
    return (
      <div className="d-flex flex-row align-items-center">
        {runtime ? longtime : ''}
      </div>
    );
  }
}

export default withStyles(styles)(LongTimeField);
