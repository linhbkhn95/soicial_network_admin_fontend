import React, { Component } from 'react';
import {
  Sidebar,
  MenuItemLink,
  translate,
  userLogout as userLogoutAction,
} from 'react-admin';
import {
  setCommonDialogAndOpen,
  closeCommonDialog,
} from '~/store/actions/general';

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import ExitIcon from '@material-ui/icons/ExitToApp';
// import LockIcon from '@material-ui/icons/Lock';
import { capitalizeFirstLetter } from '~/utils';
import { getCompanyInfo, getIdentity } from '~/store/selectors';
import { models } from 'data-generator';
import Skeleton from 'react-loading-skeleton';
import { APP_VERSION } from '../dataProvider/constants';
import BeLogo from './BeLogo';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: '0.5em',
    borderRight: 'none',
    [theme.breakpoints.only('xs')]: {
      marginTop: 0,
      height: '100vh',
      position: 'inherit',
      backgroundColor: theme.palette.background.default,
    },
    [theme.breakpoints.up('md')]: {
      border: 'none',
      marginTop: '1.5em',
    },
  },
  menuItem: {
    paddingRight: '10px',
    paddingLeft: '10px',
  },
});

class ExitIcon extends Component {
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
              d="M75 211 c-30 -6 -30 -6 -33 -85 -2 -44 2 -84 7 -89 10 -10 129 -13
138 -3 3 3 5 42 6 88 l0 83 -31 0 c-17 0 -34 4 -38 8 -4 4 -10 6 -13 6 -3 -1
-19 -4 -36 -8z m100 -91 c0 -63 -1 -65 -26 -68 -25 -3 -26 -2 -27 55 0 75 3
85 30 81 21 -3 23 -8 23 -68z m-75 -6 c0 -8 -4 -12 -10 -9 -5 3 -10 10 -10 16
0 5 5 9 10 9 6 0 10 -7 10 -16z"
            />
          </g>
        </svg>
      </React.Fragment>
    );
  }
}

class LockIcon extends Component {
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
              d="M82 214 c-12 -8 -22 -24 -22 -35 0 -10 -7 -19 -15 -19 -13 0 -15 -12
-13 -67 l3 -68 88 -3 87 -3 0 71 c0 56 -3 70 -15 70 -8 0 -15 9 -15 19 0 22
-35 51 -60 51 -9 0 -26 -7 -38 -16z m66 -16 c24 -24 13 -38 -28 -38 -26 0 -40
5 -40 13 0 18 21 37 40 37 9 0 21 -5 28 -12z m42 -108 l0 -50 -70 0 -70 0 0
50 0 50 70 0 70 0 0 -50z"
            />
            <path
              d="M97 107 c-8 -22 17 -51 37 -44 25 10 17 51 -10 55 -12 2 -24 -3 -27
-11z m33 -17 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4
11 -10z"
            />
          </g>
        </svg>
      </React.Fragment>
    );
  }
}

const CustomSidebar = withStyles(styles)(props => (
  <Sidebar
    size={260}
    PaperProps={{
      className: props.classes.drawerPaper,
      style: {
        marginTop: 0,
      },
      elevation: 1,
    }}
    header={<HeaderSidebar />}
    footer={<FooterSidebar {...props} />}
    {...props}
  />
));

const FooterSidebar = translate(
  connect(
    null,
    { userLogout: userLogoutAction, setCommonDialogAndOpen, closeCommonDialog },
  )(({ userLogout, translate, classes, ...rest }) => {
    const modal = {
      content: translate('message.modal.logoutConfirm'),
      confirmCb: () => {
        userLogout();
        rest.closeCommonDialog();
      },
    };
    return (
      <div>
        <MenuItemLink
          primaryText={capitalizeFirstLetter(
            translate('label.button.changePassword'),
          )}
          leftIcon={<LockIcon />}
          to={'/changepass'}
          className={classes.menuItem}
        />
        <MenuItemLink
          primaryText={capitalizeFirstLetter(translate('ra.auth.logout'))}
          onClick={() => rest.setCommonDialogAndOpen(modal)}
          leftIcon={<ExitIcon />}
          isNavigator={false}
          to={'/'}
          className={classes.menuItem}
        />
      </div>
    );
  }),
);

@connect(
  state => ({
    companyInfo: getCompanyInfo(state),
    user: getIdentity(state),
  }),
  { userLogout: userLogoutAction },
)
class HeaderSidebar extends React.Component {
  render() {
    const { user, companyInfo } = this.props;

    return (
      <div className="header">
        <BeLogo>
          {user && user.role == 2 ? (
            <div
              style={{ textAlign: 'right', marginTop: 0 }}
              className="version-web"
            >
              {' '}
              V {APP_VERSION}
            </div>
          ) : null}
        </BeLogo>

        {user && user.role == 2 ? (
          <div>
            <div className="div-logo">
              <div className="img-logo">
                <img
                  alt=""
                  src={
                    companyInfo[models.company.logoUrl] ||
                    '/images/logo_mini.png'
                  }
                />
              </div>
            </div>
            <h5 className="name-company">
              {companyInfo[models.company.name] &&
              companyInfo[models.company.name] != undefined ? (
                companyInfo[models.company.name]
              ) : (
                <Skeleton />
              )}
            </h5>
            <div className="row-info">{companyInfo[models.company.phone]}</div>
            <div className="row-info">
              {companyInfo[models.company.id] &&
              companyInfo[models.company.id] != undefined ? (
                `ID: ${companyInfo[models.company.id]}`
              ) : (
                <Skeleton />
              )}
            </div>
          </div>
        ) : (
          <div
            style={{ marginTop: '8px', display: 'flex' }}
            className="version-web"
          >
            {' '}
            V {APP_VERSION}
          </div>
        )}
      </div>
    );
  }
}
// const HeaderSidebar = connect(state => ({
//   companyInfo: getCompanyInfo(state),
//   user: getIdentity(state),
// }))(
//   translate(
//     connect(
//       null,
//       { userLogout: userLogoutAction },
//     )(({ user, companyInfo }) => (
//       <div className="header">
//         <div className="logo">
//           <div className="text">
//             <div className="list-char">
//               <div className="char-V">b</div>
//               <div className="char-E">e</div>
//             </div>
//             <div className="name-project">
//               <div className="text">
//                 {user && user.role == 2 ? 'Fleet' : 'Fleet Admin'}{' '}
//               </div>
//             </div>
//           </div>
//           {user && user.role == 2 ? (
//             <div
//               style={{ marginTop: '8px', display: 'flex' }}
//               className="version-web"
//             >
//               {' '}
//               V {APP_VERSION}
//             </div>
//           ) : null}
//         </div>
//         {user && user.role == 2 ? (
//           <div>
//             <div className="div-logo">
//               <div className="img-logo">
//                 <img
//                   alt=""
//                   src={
//                     companyInfo[models.company.logoUrl] ||
//                     '/images/logo_mini.png'
//                   }
//                 />
//               </div>
//             </div>
//             <h5 className="name-company">
//               {companyInfo[models.company.name] &&
//               companyInfo[models.company.name] != undefined ? (
//                 companyInfo[models.company.name]
//               ) : (
//                 <Skeleton />
//               )}
//             </h5>
//             <div className="row-info">{companyInfo[models.company.phone]}</div>
//             <div className="row-info">
//               {companyInfo[models.company.id] &&
//               companyInfo[models.company.id] != undefined ? (
//                 `ID: ${companyInfo[models.company.id]}`
//               ) : (
//                 <Skeleton />
//               )}
//             </div>
//           </div>
//         ) : (
//           <div
//             style={{ marginTop: '8px', display: 'flex' }}
//             className="version-web"
//           >
//             {' '}
//             V {APP_VERSION}
//           </div>
//         )}
//       </div>
//     )),
//   ),
// );
export default CustomSidebar;
