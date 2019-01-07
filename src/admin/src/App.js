import "babel-polyfill";
import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import { role } from "~/dataProvider/constants";
import createHistory from "history/createBrowserHistory";
// import { connect } from 'react-redux';
import ForgotPasswordPage from "~/ui/user/forgotpass/ForgotPassword";
import ResetPasswordPage from "./ui/user/forgotpass/ResetPassword";
import {
  addAccessToken,
  addRequestAccessToken,
  flushOutNull,
  formDataToHeader,
  adjustPhoneNumber,
} from "~/dataProvider/apiClient/enhancer";
import { getMe } from "~/store/actions/auth";
import authServiceClient from "~/dataProvider/apiClient/auth";
import authProvider from "./authProvider";
import sagas from "./sagas";
import WithPermission from "~/ui/commons/WithPermission";

import themeReducer from "./themeReducer";
import Login from "./ui/Login";
import Layout from "./ui/Layout";
import Menu from "./ui/Menu";
import customRoutes from "./routes";
import vietnameseMessages from "./i18n/vi";
import * as customReducers from "~/store/reducers";
import MapView, { MapIcon } from "./ui/map";
import ChangePass from "./ui/user/changepass";
import SearchView, { SearchIcon } from "./ui/search2";

import Contract, { ContractIcon } from "./ui/contract";

import "./App.css";
import {
  VehicleList,
  VehicleEdit,
  VehicleCreate,
  VehicleShow,
  VehicleIcon,
} from "./ui/notifications";

import {
  GroupList,
  FleetEdit,
  FleetCreate,
  //, FleetShow
} from "./ui/group";

import { UserList, UserEdit, UserCreate, UserShow } from "./ui/user";

import ListPost, { DriverMenuIcon } from "./ui/posts";

import dataProviderFactory from "./dataProvider";
import fakeServerFactory from "./fakeServer";
import ListPayment from "./ui/payments";
import ListIncome from "./ui/incomes";

import momentTZ from "moment-timezone";
import moment from "moment";
import theme from "./theme";
import "moment/locale/vi";
import EarningShow from "./ui/incomes/Detail";
import { Dashboard } from "./dashboard";

const defaultLanguageId = "vi";
const defaultLanguage = vietnameseMessages;

// in the config function
async function useLocale(name: string) {
  // import locale as you do normally
  // smth like `require('moment/locale/en-gb')` will happen down the lines
  await import(`moment/locale/${name}`);
  moment.locale(name); // apply it to moment
  // eslint-disable-next-line no-underscore-dangle (in case eslint is also used ;) )
  momentTZ.defineLocale(name, moment.localeData()._config); // copy locale to moment-timezone
  momentTZ.locale(name); // apply it to moment-timezone
}

useLocale("vi");

const i18nProvider = locale => {
  if (locale !== defaultLanguageId) {
    return import(`moment/locale/${locale}`)
      .then(() => useLocale("vi").then(import(`./i18n/${locale}`)))
      .then(messages => messages.default);
  }

  // Always fallback on english
  return defaultLanguage;
};

class App extends Component {
  state = { dataProvider: null };

  async componentWillMount() {
    const dataProvider = await dataProviderFactory(
      process.env.REACT_APP_CLIENT,
    );

    this.restoreFetch = await fakeServerFactory(
      process.env.REACT_APP_DATA_PROVIDER,
    );

    this.setState({ dataProvider });
  }

  componentWillUnmount() {
    this.restoreFetch();
  }

  render() {
    const { dataProvider } = this.state;
    const initActions = [getMe()];

    if (!dataProvider) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    const _dataProvider = addAccessToken(
      addRequestAccessToken(
        formDataToHeader(adjustPhoneNumber(flushOutNull(dataProvider))),
        () => localStorage.getItem("refreshToken"),
        authServiceClient.refreshAccessToken,
      ),
    );

    return (
      <Admin
        title="Agiletech Admin"
        dataProvider={_dataProvider}
        initActions={initActions}
        theme={theme}
        customReducers={{ theme: themeReducer, ...customReducers }}
        customSagas={sagas}
        customRoutes={customRoutes}
        authProvider={authProvider}
        outsideRoutes={[
          {
            exact: true,
            path: "/forgot-password",
            component: ForgotPasswordPage,
          },
          {
            exact: true,
            path: "/reset-password",
            component: ResetPasswordPage,
          },
        ]}
        history={createHistory()}
        dashboard={()=><Dashboard dataProvider={dataProvider} />}
        loginPage={Login}
        appLayout={Layout}
        menu={Menu}
        locale={defaultLanguageId}
        i18nProvider={i18nProvider}
      >
        {[
          resourceWithPermission(
            "map",
            { icon: MapIcon },
            {
              component: MapView,
              permission: [role.normalUser],
              props: { dataProvider: _dataProvider },
            },
            null,
            null,
            null,
          ),
          resourceWithPermission(
            "posts",
            { icon: DriverMenuIcon },
            {
              component: ListPost,
              permission: role.admin,
              props: { dataProvider: _dataProvider },
            },
            null,
            {
              component: VehicleEdit,
              permission: role.normalUser,
            },
            {
              component: VehicleCreate,
              permission: role.normalUser,
            },
          ),
          resourceWithPermission(
            "notifications",
            { icon: VehicleIcon },
            {
              component: VehicleList,
              permission: role.admin,
              props: {
                dataProvider: _dataProvider,
              },
            },
            //   { component: VehicleShow, permission: role.normalUser },
            null,
            null,
            null,
            {
              /* {
              component: VehicleEdit,
              permission: role.normalUser,
            },
            {
              component: VehicleCreate,
              permission: role.normalUser,
            }, */
            },
          ),
          resourceWithPermission(
            "groups",
            { icon: VehicleIcon },
            {
              component: GroupList,
              permission: role.admin,
              props: { dataProvider: _dataProvider },
            },
            null,
            {
              component: FleetEdit,
              permission: role.admin,
              props: { dataProvider: _dataProvider },
            },
            {
              component: FleetCreate,
              permission: role.admin,
            },
          ),
          resourceWithPermission(
            "payments",
            { options: { label: "Payments" } },
            {
              component: ListPayment,
              permission: [role.normalUser],
            },
            null,
            null,
            null,
          ),
          // resourceWithPermission('earnings/details'),

          resourceWithPermission(
            "earnings",
            { options: { label: "Incomes" } },
            {
              component: ListIncome,
              permission: [role.normalUser],
              props: { dataProvider: _dataProvider },
            },
            null,
            null,
            null,
          ),
          resourceWithPermission(
            "search",
            { icon: SearchIcon },
            {
              component: SearchView,
              permission: [role.normalUser],
              props: { dataProvider: _dataProvider },
            },
            null,
            null,
            null,
          ),
          resourceWithPermission(
            "changePass",
            { icon: SearchIcon },
            {
              component: ChangePass,
              permission: [role.admin, role.normalUser],
              props: { dataProvider: _dataProvider },
            },
            null,
            null,
            null,
          ),
          resourceWithPermission(
            "contract",
            { icon: ContractIcon },
            {
              component: Contract,
              permission: role.normalUser,
              props: { dataProvider: _dataProvider },
            },
            null,
            null,
            null,
          ),
          resourceWithPermission(
            "users",
            { icon: VehicleIcon },
            { component: UserList, permission: role.admin },
            { component: UserShow, permission: role.admin },
            {
              component: UserEdit,
              permission: role.admin,
              props: { dataProvider: _dataProvider },
            },
            {
              component: UserCreate,
              permission: role.admin,
              dataProvider: _dataProvider,
              props: { dataProvider: _dataProvider },
            },
          ),
        ]}
      </Admin>
    );
  }
}

const resourceWithPermission = (
  name,
  props = {},
  listInfo,
  showInfo,
  editInfo,
  createInfo,
) => {
  const aCom = [listInfo, showInfo, editInfo, createInfo];
  const aComTrans = aCom.map(info => {
    if (info && info.component && info.permission) {
      const ResourceWithPermission = props => (
        <WithPermission
          approvedPermissions={info.permission}
          {...props}
          render={childrenProps => (
            <info.component {...childrenProps} {...info.props || {}} />
          )}
        />
      );
      return ResourceWithPermission;
    }

    return null;
  });
  return (
    <Resource
      name={name}
      list={aComTrans[0]}
      show={aComTrans[1]}
      edit={aComTrans[2]}
      create={aComTrans[3]}
      {...props}
    />
  );
};
export default App;
