import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NumberField } from 'react-admin';

const styles = {
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
};

class TestField extends React.Component {
  render() {
    let { record, source } = this.props;
    let data = record[source];
    if (data)
      return (
        <NumberField
          {...this.props}
          locales="vi"
          options={{ style: 'currency', currency: 'VND' }}
        />
      );
    return (
      <div
        style={{ justifyContent: 'center' }}
        className="d-flex flex-row align-items-center"
      >
        ________
      </div>
    );
  }
}

export default withStyles(styles)(TestField);
