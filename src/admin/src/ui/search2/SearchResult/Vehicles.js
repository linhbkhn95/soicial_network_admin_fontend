import React, { Component } from 'react';
import path from 'object-path';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import { translate as translateDeco, GET_LIST } from 'react-admin';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FavIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import VehicleName from './components/VehicleName';

import styles from '../styles';

class Vehicles extends Component {
  state = {
    mode: '',
    fetching: true,
    needRefresh: false,
    keyword: '',
    data: {
      data: [],
      total: 0,
    },

    // data: [1, 2, 3234, 34, 234, 23].map(index => ({
    //   id: index + 1,
    //   keyword: 'Finding',
    //   is_favorite: false,
    // })),
  };

  static getDerivedStateFromProps(props, state) {
    if (props.keyword != state.keyword || props.mode != state.mode) {
      return {
        mode: props.mode,
        keyword: props.keyword,
        fetching: true,
        needRefresh: true,
      };
    }

    return null;
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    if (this.state.needRefresh) {
      this.update();
    }
  }

  async update() {
    this.setState({
      needRefresh: false,
      fetching: true,
    });

    const filters = {
      _keyword: path.get(this.state, 'keyword', '').trim(),
    };

    if (filters._keyword === '') {
      this.setState({
        fetching: false,
        data: {
          total: 0,
          data: [],
        },
      });
      return;
    }

    try {
      const result = await this.props.dataProvider(GET_LIST, 'vehicles', {
        pagination: {
          perPage: 10000,
        },
        filters,
      });

      this.setState({
        fetching: false,
        data: result,
      });
    } catch (e) {
      console.log('err', e);
      this.setState({
        fetching: false,
      });
    }
  }

  renderHeader() {
    const { data, keyword } = this.state;
    const { mode, classes, translate } = this.props;

    console.log(data);

    return (
      <div className={classnames(classes.header)}>
        {translate('resources.search.vehicle.title', {
          total: data.total,
          keyword,
        })}
      </div>
    );
  }

  render() {
    const { classes, translate } = this.props;
    const { data } = this.state;

    return (
      <React.Fragment>
        {this.renderHeader()}

        {this.state.fetching ? (
          <CircularProgress />
        ) : (
          <List
            component="nav"
            className={classnames(classes.list, classes.listMargin)}
          >
            {data.total == 0 && (
              <ListItem>
                <ListItemText
                  primary={translate('resources.search.vehicle.noResult')}
                />
              </ListItem>
            )}
            {data.data.map(item => (
              <ListItem key={item.id} button className={classes.listItem}>
                <Link
                  style={{ display: 'flex' }}
                  to={{ pathname: `/vehicles/${item.id}/show` }}
                >
                  <ListItemIcon>
                    <Avatar
                      className={classes.avatar}
                      alt={item.plate}
                      src={item.driver.avatar_url || '/images/user_default.png'}
                    />
                  </ListItemIcon>
                  <div className={classes.itemContent}>
                    <ListItemText
                      primary={item.licence_plate}
                      secondary={<VehicleName item={item} />}
                      primaryTypographyProps={{
                        className: classes.itemText,
                      }}
                    />

                    <ListItemSecondaryAction>
                      <IconButton aria-label="Comments">
                        <FavIcon
                          className={classnames(
                            classes.favIcon,
                            item.is_favorite ? classes.favIconSelected : '',
                          )}
                        />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </div>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  }
}

const VehiclesWithStyle = withStyles(styles)(Vehicles);

export default translateDeco(VehiclesWithStyle);
