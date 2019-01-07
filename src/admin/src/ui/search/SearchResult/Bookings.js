import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { translate } from 'react-admin';
import CircularProgress from '@material-ui/core/CircularProgress';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FavIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import styles from '../styles';

class Drivers extends Component {
  state = {
    fetching: true,
    list: [1, 2, 3234, 34, 234, 23].map(index => ({
      id: index + 1,
      keyword: 'Finding',
      is_favorite: false,
    })),
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        fetching: false,
      });
    }, 1000);
  }

  render() {
    const { classes, translate } = this.props;
    const { list } = this.state;

    return (
      <React.Fragment>
        <div className={classnames(classes.header, classes.headerLight)}>
          <div className={classes.headerTitle}>
            {translate('resources.search.booking.title')}
          </div>
          <div className={classes.subHeader}>
            {translate('resources.search.booking.subTitle')}
          </div>
        </div>

        {this.state.fetching ? (
          <CircularProgress />
        ) : (
          <List component="nav" className={classes.list}>
            {list.map(item => (
              <ListItem
                key={item.id}
                button
                className={classnames(classes.listItem, classes.noIcon)}
              >
                <div className={classes.itemContent}>
                  <ListItemText
                    primary={item.keyword}
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
              </ListItem>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  }
}

const DriversWithStyle = withStyles(styles)(Drivers);

export default translate(DriversWithStyle);
