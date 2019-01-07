import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import IconNotification from '@material-ui/icons/NotificationsNone';
import withStyles from '@material-ui/core/styles/withStyles';
import { capitalizeFirstLetter, checkPermissions } from '~/utils';

import { role } from '~/dataProvider/constants';
import {
  translate as translateDeco,
  MenuItemLink,
  Responsive,
} from 'react-admin';
import WithPermission from '~/ui/commons/WithPermission';
import { withRouter } from 'react-router-dom';
// import { CommandIcon } from './commands';
// import { ProductIcon } from './products';
// import { CategoryIcon } from './categories';
// import { ReviewIcon } from './reviews';
import { MapIcon } from './map';
import { SearchIcon } from './search';
// import { PaymentIcon } from './payments';
import { IncomeIcon } from './incomes';
import { ContractIcon } from './contract';
// import { UserIcon } from './user';

const styleMenu = () => ({
  menuItem: {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
});

class UserIcon extends Component {
  render() {
    return (
      <React.Fragment>
        <svg
          className="menu-icon"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="24.000000pt"
          height="24.000000pt"
          viewBox="0 0 24.000000 24.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <metadata>
            Created by potrace 1.14, written by Peter Selinger 2001-2017
          </metadata>
          <g
            transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              d="M74 209 c-25 -13 -54 -60 -54 -89 0 -12 7 -35 17 -50 39 -66 128 -66
167 1 49 83 -42 180 -130 138z m97 -69 c24 0 29 -4 29 -24 0 -35 -43 -76 -80
-76 -33 0 -80 40 -80 67 0 8 12 28 27 43 l27 29 24 -20 c14 -10 38 -19 53 -19z"
            />
            <path
              d="M80 110 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
-10 -4 -10 -10z"
            />
            <path
              d="M140 110 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
-10 -4 -10 -10z"
            />
          </g>
        </svg>
      </React.Fragment>
    );
  }
}

const items = [
  {
    name: 'search',
    icon: <SearchIcon className="menu-icon" />,
    permission: role.normalUser,
  },
  {
    name: 'map',
    icon: <MapIcon className="menu-icon" />,
    permission: role.normalUser,
  },


  {
    name: 'notifications',
    icon:<IconNotification style={{fontSize:"20px",    marginTop: '0px'}} className="menu-icon"/>,

    permission: role.admin,
  },
  {
    name: 'groups',
    icon: <ListIcon className="menu-icon" />,
    permission: role.admin,
  },
 
  {
    name: 'earnings',
    icon: <IncomeIcon className="menu-icon" />,
    permission: role.normalUser,
  },

  // { name: "payments", icon: <PaymentIcon className="menu-icon" /> },

  {
    name: 'contract',
    icon: <ContractIcon className="menu-icon" />,
    permission: role.normalUser,
  },
  {
    name: 'users',
    icon: <UserIcon className="menu-icon" />,
    permission: role.admin,
  },
  {
    name: 'posts',
    icon: <ContractIcon className="menu-icon" />,
    permission: role.admin,
  },
  {
    name: 'schools',
    icon: <ContractIcon className="menu-icon" />,
    permission: role.admin,
  },
  {
    name: 'workPlaces',
    icon: <ContractIcon className="menu-icon" />,
    permission: role.admin,
  },
];

const Menu = ({ onMenuClick, classes, translate, logout, permission }) => (
  <div>
    {items.map(item => {
      const plainMenuLink = (
        <MenuItemLink
          key={item.name}
          to={`/${item.name}`}
          primaryText={capitalizeFirstLetter(
            translate(`resources.${item.name}.name`, {
              smart_count: 2,
            }),
          )}
          className={classes.menuItem}
          leftIcon={item.icon}
          onClick={onMenuClick}
        />
      );
      if (item.permission) {
        return (
          <WithPermission
            render={({ permission }) => {
              console.log(
                `permissions ${permission} item.permission ${item.permission}`,
              );
              return checkPermissions(item.permission, permission)
                ? plainMenuLink
                : null;
            }}
          />
        );
      }
      return plainMenuLink;
    })}
    <Responsive
      xsmall={
        <MenuItemLink
          to="/configuration"
          primaryText={translate('pos.configuration')}
          leftIcon={<SettingsIcon />}
          onClick={onMenuClick}
        />
      }
      medium={null}
    />
    <Responsive xsmall={logout} medium={null} />
  </div>
);

Menu.propTypes = {
  onMenuClick: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string),
  translate: PropTypes.func,
  logout: PropTypes.func,
};

Menu.defaultProps = {
  onMenuClick: () => {},
  logout: () => {},
  translate: () => {},
  classes: {},
};

const enhance = compose(
  withRouter,
  withStyles(styleMenu),

  connect(
    state => ({
      theme: state.theme,
      locale: state.i18n.locale,
    }),
    {},
  ),
  translateDeco,
);

export default enhance(Menu);
