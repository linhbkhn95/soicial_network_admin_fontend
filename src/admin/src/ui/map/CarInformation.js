import React, { Component } from 'react';
import path from 'object-path';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import { GET_ONE } from 'ra-core/lib/dataFetchActions';

export default class CarInformation extends Component {
  state = {
    data: null,
    information: {
      id: null,
    },
    needRefresh: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.information.id != state.information.id) {
      return {
        information: props.information,
        needRefresh: true,
      };
    }

    return null;
  }

  async componentDidUpdate() {
    if (this.state.needRefresh) {
      // fetching
      const { id } = this.state.information;
      try {
        // const data = await mapProvider(GET_ONE, `/vehicles/${id}`);

        // const { data } = await this.props.dataProvider(GET_ONE, 'vehicles', {
        //   id,
        // });

        const { data } = await this.props.dataProvider(
          GET_ONE,
          'statistic/map/vehicles',
          {
            id,
          },
        );

        this.setState({
          data,
          needRefresh: false,
        });
      } catch (e) {
        this.setState({
          needRefresh: false,
        });
      }
    }
  }

  get worktime() {
    const { worktime } = this.state.data;
    if (isNaN(worktime)) {
      return (
        <React.Fragment>
          Đã chạy <span>0</span> giờ
        </React.Fragment>
      );
    }

    const totalMinutes = Math.trunc(worktime / 60);
    const totalHours = Math.trunc(totalMinutes / 60);
    const remainMinutes = totalMinutes - totalHours * 60;

    const remainMinutesText = remainMinutes && (
      <React.Fragment>
        <span>{remainMinutes}</span> phút
      </React.Fragment>
    );
    const hourText = totalHours && (
      <React.Fragment>
        Đã chạy <span>{totalHours}</span> giờ
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {hourText} {remainMinutesText}
      </React.Fragment>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <div className="car-information">
        <div className="title">Thông tin xe</div>
        {this.state.data ? (
          <React.Fragment>
            <div className="data">
              <div className={`avatar ${data.is_online ? 'online' : ''}`}>
                <img
                  src={path.get(
                    data,
                    'avatar',
                    'https://www.gravatar.com/avatar/2e0d5407ce8609047b8255c50405d7b1',
                  )}
                />
              </div>
              <div className="meta">
                <div className="license">{data.plate}</div>
                <div className="vehice">{data.brand}</div>
                <div className="time">{this.worktime}</div>
              </div>
            </div>
            <div className="title">Thông tin tài xế</div>
            <div className="data">
              <div className="avatar">
                <img
                  src={path.get(
                    data,
                    'driver.avatar_url',
                    'https://www.gravatar.com/avatar/2e0d5407ce8609047b8255c50405d7b1',
                  )}
                />
              </div>
              <div className="meta">
                <div className="name">
                  {path.get(data, 'driver.name', '<empty>')}
                </div>
                <div className="phone">
                  {path.get(data, 'driver.phone', '<empty>')}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="spin">
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

CarInformation.propTypes = {
  dataProvider: PropTypes.func,
};
