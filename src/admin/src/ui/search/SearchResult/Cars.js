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
import styles from '../styles';

class Cars extends Component {
  state = {
    mode: '',
    fetching: true,
    needRefresh: false,
    keyword: '',
    data: {
      data: [],
      total: 4,
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
          perPage: this.state.mode === 'submit' ? 5 : 100,
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

  readmore = e => {
    e.preventDefault();
    // update
    // this.update();

    this.props.onReadMore();
  };

  renderHeader() {
    const { data } = this.state;
    const { mode, classes, translate } = this.props;
    if (mode === 'submit') {
      return (
        <div className={classnames(classes.header, classes.headerLight)}>
          <div className={classes.headerTitle}>
            {translate('resources.search.suggestion.car.title')}
          </div>
          <div className={classes.subHeader}>
            {translate('resources.search.car.result', {
              keyword: this.state.keyword,
              total: data.total,
            })}{' '}
            <a href="#" onClick={this.readmore}>
              {translate('resources.search.car.readmore')}
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className={classnames(classes.header, classes.headerLight)}>
        <div className={classes.headerTitle}>
          {translate('resources.search.suggestion.car.title')}
        </div>
        <div className={classes.subHeader}>
          {translate('resources.search.suggestion.car.subTitle')}
        </div>
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
          <List component="nav" className={classes.list}>
            {data.total == 0 && (
              <ListItem>
                <ListItemText
                  primary={translate(
                    'resources.search.suggestion.car.noResult',
                  )}
                />
              </ListItem>
            )}
            {data.data.map(item => (
              <ListItem key={item.id} button className={classes.listItem}>
                <ListItemIcon>
                  <Avatar
                    className={classes.avatar}
                    alt={item.plate}
                    src="https://material-ui.com/static/images/remy.jpg"
                  />
                </ListItemIcon>
                <div className={classes.itemContent}>
                  <Link to={{ pathname: `/vehicles/${item.id}/show` }}>
                    <ListItemText
                      primary={item.licence_plate}
                      secondary={item.mark_id || '(empty)'}
                      primaryTypographyProps={{
                        className: classes.itemText,
                      }}
                    />
                  </Link>

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
              </ListItem>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  }
}

const CarsWithStyle = withStyles(styles)(Cars);

export default translateDeco(CarsWithStyle);
