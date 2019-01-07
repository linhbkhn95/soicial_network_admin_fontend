import React from 'react';
import {
  translate as translateDeco,
  Filter,
  List,
  Datagrid,
  NumberField,
  DateField,
  Responsive,
  TextField,
  SearchInput,
} from 'react-admin';
import { connect } from 'react-redux';

import Title from '~/ui/commons/Title';
import { models } from 'data-generator';
import NumberFormat from 'react-number-format';
import BackHistoryBtn from '~/ui/commons/Buttons/BackHistoryBtn';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import DefaultPagination from '~/ui/commons/DefaultPagination';
import AvatarStatus from '~/ui/commons/AvatarStatus';
import LongTimeField from './components/LongTimeField';
import TestField from './components/TestField';
import MobileGrid from './components/MobileGrid';
import ReactDate from '~/ui/commons/reactdate/ReactDate';
import { getStatisticsEarnings } from '~/dataProvider/apiClient/resource';
import { getFilterValues } from '~/store/selectors/general';
import { extractRangeDate, getStringDateRangeSubtitle } from '~/utils';

// const EarningTitle = ({ record = {}, header }) => (
//   <React.Fragment>{header}</React.Fragment>
// );

const filterRangeDateKey = 'date';
const filterSearchKey = '_keyword';

const ShowFormprependblock = props => <backhistorybtn {...props} />;

const filterStyles = {
  searchInput: {
    marginTop: 1,
    marginBottom: 0,
  },
};

const VehicleEarningFilter = withStyles(filterStyles)(props => (
  <Filter {...props}>
    <SearchInput
      placeholder={props.placeholder}
      source={filterSearchKey}
      alwaysOn
      options={{ variant: 'outlined' }}
      className={props.classes.searchInput}
    />
    <ReactDate
      options={{ variant: 'outlined' }}
      alwaysOn
      {...props}
      source={filterRangeDateKey}
      sortable={false}
    />

    {/* <DateInput source="last_seen_gte" />
    <NullableBooleanInput source="has_ordered" />
    <NullableBooleanInput source="has_newsletter" defaultValue /> */}
  </Filter>
));

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

  render() {
    const { translate, filterValues } = this.props;

    const { statistics } = this.state;
    const rangeDateFilterValue = filterValues[filterRangeDateKey];
    const rangeDateSubtitle = getStringDateRangeSubtitle(
      extractRangeDate(rangeDateFilterValue),
      translate,
    );

    return (
      <div style={{ height: 'calc(100% - 120px)' }}>
        <div
          style={{
            fontSize: '12px',
            lineHeight: '22px',
            color: 'rgba(32, 48, 72, 0.6)',
            fontFamily: 'IBM Plex Sans',
            marginTop: '-30px',
          }}
        >
          {rangeDateSubtitle}
        </div>

        <ul className="flex-container row">
          <li style={{ margin: '2px' }} className="flex-item">
            <div className="column label-total-runtime">
              {translate('text.total_runtime')}
            </div>
            <div className="column runtime-total">
              <NumberFormat
                value={statistics.total_time}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                fixedDecimalScale={true}
                decimalScale={2}
              />
              h
            </div>
          </li>
          <li className="item-total flex-item">
            <div className="column label-total">
              {translate('text.total_money')}
            </div>
            <div className="column money-total">
              <NumberFormat
                value={statistics.total_earning}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                fixedDecimalScale={true}
                decimalScale={0}
              />{' '}
              đ
            </div>
          </li>
          <li className=" item-total flex-item">
            <div className="column label-total">
              {translate('text.customer_payment_money')}
            </div>
            <div className="column money-total">
              {/* <NumberFormat
              value={detail.total_cash}
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              fixedDecimalScale={true}
              decimalScale={0}
            />đ */}
              ____
            </div>
          </li>
          <li className=" item-total flex-item">
            <div className="column label-total">
              {translate('text.customer_payment_card')}
            </div>
            <div className="column money-total">
              {/* <NumberFormat
              value={detail.total_card}
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              fixedDecimalScale={true}
              decimalScale={0}
            />{' '}
            đ */}
              ____
            </div>
          </li>
          <li className="flex-item">
            <div className="column label-total-runtime">
              {translate('text.actually_received')}
            </div>
            <div className="column all-money-total">
              {/* <NumberFormat
              value={detail.actually_received}
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              fixedDecimalScale={true}
              decimalScale={0}
            />{' '}
            đ */}
              ____
            </div>
          </li>
        </ul>
        <Responsive
          {...this.props}
          xsmall={<MobileGrid />}
          medium={
            <Datagrid>
              {/* <TextField source={models.driver.fullname} /> */}
              <TextField source={models.vehicleEarningDetail.engagementId} />
              <AvatarStatus
                source={models.vehicleEarningDetail.driverName}
                picSource={[
                  models.vehicle.driver,
                  models.driver.profilePicture,
                ]}
                statusSource={[
                  models.vehicleEarningDetail.driver,
                  models.driver.status,
                ]}
                textSrc={models.vehicleEarningDetail.driverName}
              />
              <DateField
                source={models.vehicleEarningDetail.dropTime}
                options={{
                  hour: 'numeric',
                  minute: 'numeric',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }}
                locales="vi"
              />
              <TestField
                source={models.vehicleEarningDetail.totalAmount}
                locales="vi"
                options={{ style: 'currency', currency: 'VND' }}
              />

              <TestField
                source={models.vehicleEarningDetail.vatTax}
                locales="vi"
                options={{ style: 'currency', currency: 'VND' }}
              />
              <TestField
                source={models.vehicleEarningDetail.beEarnings}
                locales="vi"
                options={{ style: 'currency', currency: 'VND' }}
              />
              <TestField
                source={models.vehicleEarningDetail.tncnTax}
                locales="vi"
                options={{ style: 'currency', currency: 'VND' }}
              />
              <TestField
                source={models.vehicleEarningDetail.subCost}
                locales="vi"
                options={{ style: 'currency', currency: 'VND' }}
              />
              <TestField
                source={models.vehicleEarningDetail.realEarning}
                locales="vi"
                options={{ style: 'currency', currency: 'VND' }}
              />
            </Datagrid>
          }
        />
      </div>
    );
  }
}

const PrependBlock = props => <BackHistoryBtn {...props} />;

@withStyles(styles)
@translateDeco
@connect(state => ({}))
export default class EarningShow extends React.Component {
  render() {
    const { translate, classes, ...props } = this.props;

    const { id } = this.props.match.params;

    return (
      <List
        {...props}
        resource={`earnings/${id}/details`}
        bulkActions={false}
        pagination={<DefaultPagination />}
        prependBlock={<PrependBlock history={props.history} />}
        bulkActionButtons={false}
        title={translate('label.header.earning_detail', { id })}
        filters={
          <VehicleEarningFilter
            placeholder={`${translate('placeholder.search_earning_detail')}`}
          />
        }
        sort={{ field: 'pickup_time', order: 'DESC' }}
        perPage={25}
        cardProps={{
          style: {
            backgroundColor: 'transparent',
            overflow: 'visible',
            height: 'calc(100% +23px)',
          },
        }}
      >
        <div />
      </List>
    );
  }
}

{/* <Table /> */}

