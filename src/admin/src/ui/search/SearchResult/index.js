import React, { Component } from 'react';
import _ from 'lodash';
import Cars from './Cars';
import Drivers from './Drivers';
import Bookings from './Bookings';

export default class SearchResult extends Component {
  state = {
    filters: {
      vehicle: '',
      driver: '',
      booking: '',
    },

    visibles: {
      vehicle: true,
      driver: true,
      booking: true,
    },
  };

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.filters, state.filters)) {
      return {
        filters: {
          ...state.filters,
          ...props.filters,
        },
        visibles: {
          vehicle: !!props.filters.vehicle, //true,
          driver: !!props.filters.driver,
          booking: !!props.filters.booking,
        },
      };
    }

    return null;
  }

  render() {
    const { dataProvider, mode, filters } = this.props;

    return (
      <React.Fragment>
        {this.state.visibles.vehicle && (
          <Cars
            mode={mode}
            dataProvider={dataProvider}
            keyword={filters.vehicle}
            onReadMore={() => {
              this.setState({
                visibles: {
                  vehicle: true,
                  driver: false,
                  booking: false,
                },
              });
            }}
          />
        )}

        {this.state.visibles.driver && (
          <Drivers
            mode={mode}
            dataProvider={dataProvider}
            keyword={filters.driver}
            onReadMore={() => {
              this.setState({
                visibles: {
                  vehicle: false,
                  driver: true,
                  booking: false,
                },
              });
            }}
          />
        )}

        {this.state.visibles.booking && (
          <Bookings
            mode={mode}
            dataProvider={dataProvider}
            keyword={filters.booking}
            onReadMore={() => {
              this.setState({
                visibles: {
                  vehicle: false,
                  driver: false,
                  booking: true,
                },
              });
            }}
          />
        )}
      </React.Fragment>
    );
  }
}
