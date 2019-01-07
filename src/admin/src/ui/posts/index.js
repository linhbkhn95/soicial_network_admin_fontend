import React, { Component } from "react";
import PropTypes from "prop-types";
import { models } from "data-generator";
import { connect } from "react-redux";
import { getListTotal } from "~/store/selectors";
import IncomeField from "./components/IncomeField";
import TimeField from "./components/TimeField";

//  import ButtonImport from '../../../../src/utils/input/ButtonImport'
import Button from "@material-ui/core/Button";
import "./index.css";
import {
  Datagrid,
  // DateInput,
  Filter,
  List,
  // NullableBooleanInput,
  // NumberField,
  Responsive,
  TextField,
  translate as translateDeco,
} from "react-admin";
import EditBar from "./components/EditBar";

import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/LocalTaxi";
// import Person from '@material-ui/icons/PersonPin';
import DefaultPagination from "~/ui/commons/DefaultPagination";

import PlateAvatarStatus from "./components/PlateAvatarStatus";
import DriverChipStatus from "./components/DriverChipStatus";
// import CommentField from './components/CommentField';

import AvatarStatus from "~/ui/commons/AvatarStatus";
import RateField from "~/ui/commons/RateField";

import LongTimeField from "./components/LongTimeField";
import SeatField from "./components/SeatField";
import MobileGrid from "./components/MobileGrid";
import ReactDate from "../commons/reactdate/ReactDate";
// import ListItemText from '@material-ui/core/ListItemText';
// import FieldWaning from './components/FieldWarning';
import ModalCreate from "./components/ModalCreateDriver";
import DriverMenuIcon from "./components/DriverMenuIcon";
import SearchInput from "../commons/SearchInput";

/**
 * @deprecated
 */
export const VisitorIcon = Icon;

export { DriverMenuIcon };

const DriverFilter = props => (
  <Filter {...props}>
    <SearchInput
      placeholder={props.placeholder}
      source="_keyword"
      alwaysOn
      options={{ variant: "outlined" }}
    />
    <ReactDate
      options={{ variant: "outlined" }}
      alwaysOn
      source="date"
      sortable={false}
    />

    {/* <DateInput source="last_seen_gte" />
    <NullableBooleanInput source="has_ordered" />
    <NullableBooleanInput source="has_newsletter" defaultValue /> */}
  </Filter>
);

const styles = theme => ({
  buttonCreate: {
    padding: "6px 16px",
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  action: {
    flexFlow: "row",
    display: "flex",
  },
});

const onRowClick = record => e => {
  console.log("----------------------------");
  console.log(record, e);
  console.log("----------------------------");
};

const Driver = withStyles(styles)(
  translateDeco(({ translate, classes, total, ...props }) => (
    <List
      {...props}
      bulkActions={false}
      perPage={10}
      pagination={<DefaultPagination />}
      bulkActionButtons={false}
      actions={
        <div
          style={{ flexFlow: "row", display: "flex", margin: "2px" }}
          className={classes.action}
        >
          <Button
            className={classes.buttonCreate}
            onClick={props.onClickCreate}
            variant="contained"
            color="primary"
          >
            {translate("label.button.createDriver")}
            {/* <AddIcon className={classes.rightIcon} /> */}
          </Button>
        </div>
      }
      title={
        <div>
          {translate("titleContent.listDriver")}
          <div
            style={{
              fontSize: "12px",
              lineHeight: "22px",
              color: "rgba(32, 48, 72, 0.6)",
              fontFamily: "IBM Plex Sans",
            }}
          >
            {translate("text.total")} {total} bài đăng
          </div>
        </div>
      }
      filters={
        <DriverFilter
          placeholder={`${translate("placeholder.searchDriver")}`}
        />
      }
      sort={{ field: "createdAt", order: "DESC" }}
      cardProps={{
        style: {
          backgroundColor: "transparent",
          overflow: "inherit",
          height: "calc(100% - 14px)",
        },
      }}
    >
      <Responsive
        xsmall={<MobileGrid />}
        medium={
          <Datagrid onRowClick={onRowClick}>
            <AvatarStatus
              source="user_post"
              type="users"
              picSource={["user", "url_avatar"]}
              textSrc={["user", "fullname"]}
              statusSource={["user", "is_online"]}
            />
            <TimeField source="createdAt" />
            {/* <TextField source="title" sortable={false} /> */}
            <TextField source="content" sortable={false} />
            {/* <TextField source="incognito" sortable={false} /> */}
            {/* <TextField source="police" sortable={false} /> */}
            <AvatarStatus
              source="group"
              checkNullSource={true}
              type="groups"
              picSource={["group", "image"]}
              textSrc={["group", "groupname"]}
              statusSource={["group", "status"]}
            />
            <RateField
              type="like"
              source="countLike"
              rate="countLike"
              sortable={false}
            />
            <DriverChipStatus source={models.driver.status} sortable={false} />
            <EditBar
              // toggleStatusSrc={models.me.status}
              hasDelete
              // hasEdit
              // hasSwitch
            />
            {/* <CommentField source={models.driver.comment} /> */}
          </Datagrid>
        }
      />
    </List>
  )),
);

@connect(
  state => ({
    total: getListTotal(state, "posts"),
  }),
  null,
)
export default class ListPost extends React.Component {
  static propTypes = {
    dataProvider: PropTypes.func,
  };

  state = {
    showModal: false,
  };

  onClickCreate = () => {
    this.setState({ showModal: true });
  };

  close = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { dataProvider } = this.props;

    return (
      <div className="page-content">
        <Driver {...this.props} onClickCreate={this.onClickCreate} />
        <ModalCreate
          dataProvider={dataProvider}
          resource="drivers"
          basePath="/drivers"
          close={this.close}
          show={this.state.showModal}
        />
      </div>
    );
  }
}
