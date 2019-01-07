import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  label: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '14px',
    fontSize: '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',

    color: 'rgba(32, 48, 72, 0.6)',
  },
  value: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '32px',
    fontSize: '24px',
    letterSpacing: '-0.002em',

    color: '#006DBA',
  },
  item: {
    borderLeft: 'solid 2px rgba(32, 48, 72, 0.2)',
    padding: '3px 26px 3px 10px',
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    listStyle: 'none',
    margin: '32px 0 20px 0',
    padding: 0,
  },
};

const StatisticItem = withStyles(styles)(
  ({ classes, label, children, color = '#006DBA' }) => (
    <li className={classes.item}>
      <div className={classes.label}>{label}</div>
      <div
        className={classes.value}
        style={{
          color,
        }}
      >
        {children}
      </div>
    </li>
  ),
);

const StatisticGroup = withStyles(styles)(({ classes, children }) => (
  <ul className={classes.group}>{children}</ul>
));

export default class Statistics extends React.Component {
  render() {
    const { items } = this.props;

    return (
      <StatisticGroup>
        {items.map((props, index) => (
          <StatisticItem key={String(index)} {...props} />
        ))}
      </StatisticGroup>
    );
  }
}
