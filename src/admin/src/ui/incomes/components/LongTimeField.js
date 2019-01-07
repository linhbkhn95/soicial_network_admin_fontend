import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

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

function hhmmss(secs) {
  let minutes = Math.floor(secs / 60);
  secs = secs % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  let res = '';
  if (hours) {
    res += ' ' + hours + 'h';
  }

  if (minutes) {
    res += ' ' + minutes + 'm';
  }

  return res.trim();
}

@withStyles(styles)
export default class LongTimeField extends React.Component {
  render() {
    const { classes, record, source } = this.props;
    const runtime = record[source];

    const longtime = hhmmss(parseInt(runtime));

    return <Fragment>{longtime ? longtime : ''}</Fragment>;
  }
}
