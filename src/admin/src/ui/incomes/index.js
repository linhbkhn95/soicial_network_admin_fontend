import React, { Component, Fragment } from 'react';
import { models } from 'data-generator';
//  import ButtonImport from '../../../../src/utils/input/ButtonImport'
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import _ from 'lodash';

import {
  // DateInput,
  Filter,
  List,
  Datagrid,
  NumberField,
  Responsive,
  // NullableBooleanInput,
  translate as translateDeco,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/LocalTaxi';
import DefaultPagination from '~/ui/commons/DefaultPagination';

import PlateAvatarStatus from '~/ui/commons/PlateAvatarStatus';

import AvatarStatus from '~/ui/commons/AvatarStatus';
import LongTimeField from './components/LongTimeField';
import TestField from './components/TestField';
import MobileGrid from './components/MobileGrid';
import ReactDate from '../commons/reactdate/ReactDate';
import { getStatisticsEarnings } from '~/dataProvider/apiClient/resource';
import { connect } from 'react-redux';
import { getFilterValues } from '~/store/selectors/general';
import { extractRangeDate, getStringDateRangeSubtitle } from '~/utils';
import * as moment from 'moment/min/moment-with-locales';
import IncomeIcon from './IncomeIcon';
import SearchInput from '../commons/SearchInput';

import './index.css';
import Statistics from './components/Statistics';
import InfoField from './components/InfoField';
import MoneyField from './components/MoneyField';
import { history } from '../../utils';

export const VisitorIcon = Icon;

// export const IncomeIcon = props => <i className="fas fa-money-bill" />;

export { IncomeIcon };

const IncomeFilter = props => (
  <Filter {...props}>
    <SearchInput
      placeholder={props.placeholder}
      source="_keyword"
      alwaysOn
      options={{ variant: 'outlined' }}
    />
    <ReactDate
      options={{ variant: 'outlined' }}
      alwaysOn
      {...props}
      source="date"
      sortable={false}
    />

    {/* <DateInput source="last_seen_gte" />
    <NullableBooleanInput source="has_ordered" />
    <NullableBooleanInput source="has_newsletter" defaultValue /> */}
  </Filter>
);

const styles = theme => ({
  buttonCreate: {
    fontWeight: 'bold',
    boxShadow: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  action: {
    flexFlow: 'row',
    display: 'flex',
  },
  list: {
    backgroundColor: 'red',
  },
});

const HeaderIncome = connect(state => ({
  filterValues: getFilterValues(state),
}))(({ translate, statistics, filterValues }) => {
  const rangeDateFilterValue = _.get(filterValues, 'date');
  const rangeDateSubtitle = getStringDateRangeSubtitle(
    extractRangeDate(rangeDateFilterValue),
    translate,
  );

  return (
    <Fragment>
      <div
        style={{
          fontSize: '14px',
          lineHeight: '20px',
          color: 'rgba(32, 48, 72, 0.6)',
          fontFamily: 'IBM Plex Sans',
          marginTop: '-24px',
        }}
      >
        {rangeDateSubtitle}
      </div>

      <Statistics
        items={[
          {
            label: translate('text.total_runtime'),
            color: '#006DBA',
            children: (
              <Fragment>
                <NumberFormat
                  value={statistics.total_time}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={''}
                  fixedDecimalScale={true}
                  decimalScale={2}
                />
                h
              </Fragment>
            ),
          },
          {
            label: translate('text.total_money'),
            color: '#4BA839',
            children: (
              <Fragment>
                <NumberFormat
                  value={statistics.total_money}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={''}
                  fixedDecimalScale={true}
                  decimalScale={2}
                />
                đ
              </Fragment>
            ),
          },
        ]}
      />
    </Fragment>
  );
});

@connect(state => ({
  filterValues: getFilterValues(state),
}))
class Table extends React.Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
  };

  state = {
    statistics: {},
  };

  async componentDidMount() {
    try {
      const statistics = await getStatisticsEarnings({}, {});
      if (statistics) {
        this.setState({
          statistics,
        });
      }
    } catch (error) {
      //
    }
  }

  onRowClick = record => e => {
    const { history } = this.props;
    history.push(`/earnings/${record.id}/details`);
  };

  render() {
    const { translate } = this.props;

    const { statistics } = this.state;

    return (
      <React.Fragment>
        <HeaderIncome statistics={statistics} translate={translate} />

        <div
          style={{
            height: 'calc(100% - 130px)',
          }}
        >
          <Responsive
            {...this.props}
            xsmall={<MobileGrid />}
            medium={
              <Datagrid onRowClick={this.onRowClick}>
                {/* <TextField source={models.driver.fullname} /> */}
                <InfoField source="license_plate" />
                <InfoField source="driver_name" />
                <LongTimeField textAlign="right" source="total_duration" />
                <MoneyField source="total_money" />
                <MoneyField source="total_vat" />
                <MoneyField source="total_be_receive" />
                <MoneyField source="total_tax" />
                <MoneyField source="total_fee" />
                <MoneyField
                  textAlign="right"
                  source="total_actually_received"
                />
              </Datagrid>
            }
          />
        </div>
      </React.Fragment>
    );
  }
}

@withStyles(styles)
@translateDeco
export default class IncomeGrid extends React.Component {
  render() {
    const { translate, source, classes, history, ...props } = this.props;
    return (
      <List
        {...props}
        bulkActions={false}
        pagination={<DefaultPagination />}
        bulkActionButtons={false}
        title={translate('titleContent.listIncome')}
        filters={
          <IncomeFilter
            placeholder={`${translate('placeholder.searchVehicle')}`}
          />
        }
        sort={{ field: 'pickup_time', order: 'DESC' }}
        perPage={10}
        cardProps={{
          style: {
            backgroundColor: 'transparent',
            overflow: 'visible',
            height: 'calc(100% +23px)',
          },
        }}
      >
        <Table history={history} />
      </List>
    );
  }
}
