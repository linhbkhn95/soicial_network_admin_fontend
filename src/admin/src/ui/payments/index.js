import React from 'react';
import { models } from 'data-generator';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import './index.css';
import {
  Datagrid,
  DateInput,
  Filter,
  List,
  NullableBooleanInput,
  NumberField,
  Responsive,
  SearchInput,
  TextField,
} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/icons/LocalTaxi';

import DefaultPagination from '~/ui/commons/DefaultPagination';
import LongTimeField from '~/ui/commons/LongTimeField';

import MobileGrid from './components/MobileGrid';
import { translate as translateDeco } from 'react-admin';
import ReactDate from '../commons/reactdate/ReactDate';
import InconPayment from '@material-ui/icons/Payment';
export const VisitorIcon = Icon;
export const PaymentIcon = InconPayment;
const filterStyles = {
  searchInput: {
    marginTop: 1,
    marginBottom: 0,
  },
  button: {
    backgroundColor: 'white',
    border: '1px solid #D2D6DA',
    padding: '9px 28px',
    boxShadow: 'none',
    fontWeight: 'bold',
  },
};

const VisitorFilter = withStyles(filterStyles)(props => (
  <Filter {...props}>
    <SearchInput
      placeholder={props.placeholder}
      source="q"
      alwaysOn
      options={{ variant: 'outlined' }}
      className={props.classes.searchInput}
    />
    <Button
      className={props.classes.button}
      variant="raised"
      alwaysOn
      options={{ variant: 'outlined' }}
    >
      Xem tất cả
    </Button>
    <ReactDate
      options={{ variant: 'outlined' }}
      alwaysOn
      {...props}
      source="date"
      sortable={false}
    />

    <DateInput source="last_seen_gte" />
    <NullableBooleanInput source="has_ordered" />
    <NullableBooleanInput source="has_newsletter" defaultValue />
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
});

const titleStyles = theme => ({
  title: {
    fontSize: '14px',
    lineHeight: '22px',
    color: 'rgba(17, 17, 17, 0.6)',
  },
});

export default withStyles(styles)(
  translateDeco(({ translate, source, classes, ...props }) => (
    <List
      {...props}
      bulkActions={false}
      pagination={<DefaultPagination />}
      bulkActionButtons={false}
      title={
        <div>
          {translate('titleContent.listPayment')}
          <div
            style={{
              fontSize: '12px',
              lineHeight: '22px',
              color: 'rgba(32, 48, 72, 0.6)',
              fontFamily: 'IBM Plex Sans',
            }}
          >
            {'Ngày 17 tháng 12 năm 2018 - ngày 7 tháng 1 năm 2019'}
          </div>
        </div>
      }
      filters={
        <VisitorFilter
          placeholder={`${translate('placeholder.searchPayment')}`}
        />
      }
      sort={{ field: 'last_seen', order: 'DESC' }}
      perPage={25}
      cardProps={{
        style: {
          backgroundColor: 'transparent',
          overflow: 'visible',
          height: 'calc(100% - 14px)',
        },
      }}
    >
      <Responsive
        xsmall={<MobileGrid />}
        medium={
          <Datagrid>
            {/* <TextField source={models.driver.fullname} /> */}
            <TextField source={models.payment.code} />

            <TextField source={models.payment.time} />
            <NumberField
              source={models.payment.total_money}
              locales="vi"
              options={{ style: 'currency', currency: 'VND' }}
            />

            <NumberField source={models.payment.total_vehicle} />
            <LongTimeField source={models.payment.runtime} />
            <LongTimeField source={models.payment.time_arg} />
            <NumberField
              source={models.payment.success}
              options={{ style: 'percent' }}

              // options={{ style: 'currency', currency: '%' }}
            />
            <NumberField
              source={models.payment.bonus}
              locales="vi"
              options={{ style: 'currency', currency: 'VND' }}
            />
          </Datagrid>
        }
      />
    </List>
  )),
);
