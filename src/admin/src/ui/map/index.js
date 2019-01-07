import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate as translateDeco } from 'react-admin';
// import Icon from '@material-ui/icons/Map';
import GoogleMapReact from 'google-map-react';
import { goToCurrentPosition } from './utils';
import * as MarkerTypes from './Marker';
import CarInformation from './CarInformation';

import './index.css';
import createStatisticPanel from './createStatisticPanel';

const API_KEY = 'AIzaSyBAKxpKx9DF1vC3_DZyUSMxCGa1y1EpB-g';

// export const MapIcon = Icon;


export class MapIcon extends Component {
  render() {
    return (
      <React.Fragment>
        <svg className="menu-icon" version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.14, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" stroke="none">
<path d="M20 148 c0 -72 1 -73 34 -96 33 -23 35 -23 61 -6 27 17 28 17 46 -7
18 -24 18 -24 33 -4 9 11 18 28 21 37 8 22 -11 58 -30 58 -20 0 -57 -38 -50
-50 6 -9 -14 -14 -32 -7 -13 4 -10 71 4 95 17 27 33 29 28 2 -2 -11 0 -22 6
-25 8 -5 14 15 10 38 -2 16 19 5 38 -20 19 -27 20 -27 21 -6 0 13 -12 30 -29
42 -36 26 -37 26 -68 1 -25 -20 -25 -20 -50 0 -14 11 -30 20 -34 20 -5 0 -9
-33 -9 -72z m41 32 c15 -9 19 -22 19 -67 0 -54 0 -55 -21 -41 -18 11 -22 25
-23 66 -1 29 0 52 2 52 2 0 12 -5 23 -10z m129 -88 c0 -13 -12 -22 -22 -16
-10 6 -1 24 13 24 5 0 9 -4 9 -8z"/>
</g>
</svg>

      </React.Fragment>
    );
  }
}


class MapView extends Component {
  state = {
    center: {
      lat: 21.014319,
      lng: 105.814877,
    },
    currentLocation: {
      lat: 59,
      lng: 30,
    },
    zoom: 14,

    currentMarker: null,
    markers: {},
  };

  updateMarkers() {
    const markers = [];
    for (let i = 1; i < 60; ++i) {
      markers['marker' + i] = {
        id: 'marker' + i,
        type: ['style1', 'style2'][Math.trunc(Math.random() * 2)],
        rotate: Math.random() * 180 + 'deg',
        location: {
          lat: Math.random() / 10.0 + 21.014319,
          lng: Math.random() / 10.0 + 105.814877,
        },
      };
    }
    this.setState({
      markers,
    });
  }

  onGoogleApiLoaded = ({ map, maps }) => {
    // ({ map, maps }) => console.log(map, maps)
    goToCurrentPosition(map);

    const panel = document.createElement('div');
    panel.innerHTML = createStatisticPanel({
      total: 500,
      running: 120,
      guests: 20,
      frees: 30,
      t: this.props.translate,
    });
    map.controls[maps.ControlPosition.BOTTOM_CENTER].push(panel);

    this.updateMarkers();
  };

  onChange = ({ center, bounds, marginBounds, size, zoom }) => {
    // this.setState({
    //   currentLocation: center
    // });
  };

  renderMarker = key =>
    (({ id, type, location, rotate }) => {
      const Marker = MarkerTypes[type]; // eslint-disable-line
      return (
        <Marker
          isCurrent={this.state.currentMarker === id}
          key={id}
          lat={location.lat}
          lng={location.lng}
          rotate={rotate}
          onClick={this.onChildClick(id)}
        />
      );
    })(this.state.markers[key]);

  onChildClick = key => () => {
    if (this.state.currentMarker === key) {
      // hide
      this.setState({
        currentMarker: null,
      });
      return;
    }

    this.setState({
      currentMarker: key,
    });
  };

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          scaleControl: false,
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={this.onGoogleApiLoaded}
        onChange={this.onChange}
      >
        {this.state.currentMarker && (
          <CarInformation
            dataProvider={this.props.dataProvider}
            lat={this.state.markers[this.state.currentMarker].location.lat}
            lng={this.state.markers[this.state.currentMarker].location.lng}
            information={this.state.markers[this.state.currentMarker]}
          />
        )}
        {Object.keys(this.state.markers).map(this.renderMarker)}
      </GoogleMapReact>
    );
  }
}

MapView.propTypes = {
  translate: PropTypes.func,
  dataProvider: PropTypes.func,
};

MapView.defaultProps = {
  translate: () => {},
};

export default translateDeco(MapView);
