import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import qs from 'qs';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { change } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { GET_LIST } from 'react-admin';

import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FavIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import ItemIcon from '@material-ui/icons/QueryBuilder';
import styles from './styles';

class Histories extends React.Component {
  state = {
    loading: true,
    searchState: 'suggestion',
    list: [],
    //  [1, 2, 3234, 34, 234, 23, 234].map(index => ({
    //   id: index + 1,
    //   keyword: 'Finding',
    //   is_favorite: false,
    // })),
  };

  pressHistoryItem = item => () => {
    // alert
    // console.log(item);
    const { type, keyword } = item;
    if (type == 'vehicle' || type == 'driver' || type === 'booking') {
      this.props.dispatch(change('search_form', type, keyword));
      this.props.dispatch(
        push({
          pathname: '/search',
          search: qs.stringify({
            filters: {
              [type]: keyword,
            },
          }),
        }),
      );

      window.location.reload();
    }
  };

  async componentDidMount() {
    const { data } = await this.props.dataProvider(
      GET_LIST,
      'search-histories',
    );

    this.setState({
      loading: false,
      list: data.map(item => ({
        ...item,
        is_favorite: false,
      })),
    });
  }

  render() {
    const { classes } = this.props;
    const { list } = this.state;

    return (
      <React.Fragment>
        <div className={classes.header}>Lịch sử tìm kiếm</div>
        {this.state.loading && <CircularProgress />}
        <List component="nav" className={classes.list}>
          {list.map(item => (
            <ListItem key={item.id} button className={classes.listItem}>
              <ListItemIcon>
                <ItemIcon className={classes.itemIcon} />
              </ListItemIcon>
              <div className={classes.itemContent}>
                <ListItemText
                  primary={item.keyword}
                  primaryTypographyProps={{
                    className: classes.itemText,
                  }}
                  onClick={this.pressHistoryItem(item)}
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
            </ListItem>
          ))}
        </List>
      </React.Fragment>
    );
  }
}

Histories.propTypes = {
  dataProvider: PropTypes.func,
  dispatch: PropTypes.func,
};

const HistoriesWithStyle = withStyles(styles)(Histories);

export default connect()(HistoriesWithStyle);
