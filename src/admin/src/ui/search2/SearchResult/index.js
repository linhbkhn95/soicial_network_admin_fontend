import React, { Component } from 'react';
import _ from 'lodash';
import Vehicles from './Vehicles';
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
      vehicle: false,
      driver: false,
      booking: false,
    },
  };

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.filters, state.filters)) {
      const visibles = {
        vehicle: false,
        driver: false,
        booking: false,
      };
      for (let k of Object.keys(visibles)) {
        if (props.filters[k]) {
          visibles[k] = true;
          break;
        }
      }

      return {
        filters: {
          ...state.filters,
          ...props.filters,
        },
        visibles,
      };
    }

    return null;
  }

  render() {
    const { dataProvider, mode, filters } = this.props;

    return (
      <React.Fragment>
        {this.state.visibles.vehicle && (
          <Vehicles
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
