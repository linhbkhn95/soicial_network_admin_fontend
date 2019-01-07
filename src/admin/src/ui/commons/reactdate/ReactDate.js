import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { translate as translateDeco } from 'react-admin';
import compose from 'recompose/compose';
import React from 'react';
import './reactdate.css';
import { addField } from 'react-admin';
import * as moment from 'moment/min/moment-with-locales';
import PropTypes from 'prop-types';
import { isInclusivelyBeforeDay } from 'react-dates';
import withStyles from '@material-ui/core/styles/withStyles';
import { momentFormat } from '~/config';

const styles = theme => ({
  date: {
    fontSize: '14px',
  },
});

@compose(
  addField,
  translateDeco,
  withStyles(styles),
)
export default class ReactDate extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  state = {
    focusedInput: null,
  };

  handleChange = ({ startDate, endDate }) => {
    let startdateText = '';
    let enddateText = '';
    if (startDate) startdateText = moment(startDate).format(momentFormat);
    if (endDate) enddateText = moment(endDate).format(momentFormat);

    this.props.input &&
      this.props.input.onChange &&
      this.props.input.onChange(startdateText + '-' + enddateText);
  };

  render() {
    const { classes, translate } = this.props;
    const dateRange =
      (this.props.input &&
        this.props.input.value &&
        this.props.input.value.split('-')) ||
      [];
    const startDate = dateRange[0] && moment(dateRange[0], momentFormat);
    const endDate = dateRange[1] && moment(dateRange[1], momentFormat);
    return (
      <DateRangePicker
        {...this.props}
        className={classes.date}
        startDateId="startDate"
        endDateId="endDate"
        startDatePlaceholderText={translate('placeholder.startDateId')}
        endDatePlaceholderText={translate('placeholder.endDateId')}
        startDate={startDate && startDate.isValid() ? startDate : null}
        endDate={endDate && endDate.isValid() ? endDate : null}
        onDatesChange={this.handleChange}
        focusedInput={this.state.focusedInput}
        disabledDays={new Date()}
        isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
        // isOutsideRange={(day) => day.isAfter(moment()) || day.isBefore(moment().subtract(30, 'days'))}
        onFocusChange={focusedInput => {
          this.setState({ focusedInput });
        }}
      />
    );
  }
}
