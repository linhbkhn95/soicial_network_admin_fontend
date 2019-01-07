import React, { Component } from "react";
import { models } from "data-generator";
import ListActions from "~/utils/input/ListActions";
import TimeField from './TimeField'
import {
  Create,
  Show,
  Datagrid,
  Edit,
  Filter,
  List,
  NumberField,
  Responsive,
  SimpleForm,
  TextField,
  translate as translateDeco,
  Toolbar,
  // ListActions,
} from "react-admin";
import formMetas, { vehicleShowMetas, vehicleEditMetas } from "./formMetas";
import CoalesceForm from "~/ui/commons/CoalesceForm";
import CoalesceShow from "~/ui/commons/CoalesceShow";
import DefaultPagination from "~/ui/commons/DefaultPagination";
import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from '@material-ui/icons/LocalTaxi';
import Button from "@material-ui/core/Button";
import PlateAvatarStatus from "~/ui/commons/PlateAvatarStatus";
import VehicleChipStatus from "./VehicleChipStatus.js";
import AvatarStatus from "~/ui/commons/AvatarStatus";
import Title from "~/ui/commons/Title";
import MobileGrid from "./MobileGrid";
import { getListTotal } from "~/store/selectors";
import { connect } from "react-redux";
import BackToListBtn from "~/ui/commons/Buttons/BackToListBtn";
import BackHistoryBtn from "~/ui/commons/Buttons/BackHistoryBtn";
import { compose } from "recompose";
import SearchInput from "../commons/SearchInput";
// export const VisitorIcon = Icon;

export const VehicleIcon = () => (
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
          d="M63 193 c-7 -2 -13 -11 -13 -19 0 -8 -6 -14 -14 -14 -14 0 -16 -45
-2 -92 9 -30 30 -37 40 -13 8 21 82 21 90 0 11 -30 34 -16 41 25 4 21 4 44 1
49 -4 5 -2 12 4 16 6 4 8 11 4 16 -3 5 -9 7 -14 4 -5 -3 -14 4 -20 15 -9 16
-20 20 -58 19 -26 0 -53 -3 -59 -6z m95 -12 c6 -1 12 -8 12 -16 0 -11 -12 -15
-50 -15 -36 0 -50 4 -50 14 0 17 13 22 48 20 15 -1 33 -3 40 -3z m-94 -82 c-3
-5 -10 -7 -15 -3 -5 3 -7 10 -3 15 3 5 10 7 15 3 5 -3 7 -10 3 -15z m118 -1
c-7 -7 -12 -8 -12 -2 0 14 12 26 19 19 2 -3 -1 -11 -7 -17z"
        />
      </g>
    </svg>
  </React.Fragment>
);

const VehicleFilter = props => (
  <Filter {...props}>
    <SearchInput
      placeholder={props.placeholder}
      source="_keyword"
      alwaysOn
      options={{ variant: "outlined" }}
    />
  </Filter>
);

const colored = WrappedComponent => {
  const Colored = props =>
    props.record[props.source] > 500 ? (
      <span style={{ color: "red" }}>
        <WrappedComponent {...props} />
      </span>
    ) : (
      <WrappedComponent {...props} />
    );

  Colored.displayName = `Colored(${WrappedComponent.displayName})`;

  return Colored;
};

export const ColoredNumberField = colored(NumberField);
ColoredNumberField.defaultProps = NumberField.defaultProps;

const listStyles = {
  nb_commands: { color: "purple" },
};

const VehicleTitle = compose(
  connect(state => ({
    total: getListTotal(state, "notifications"),
  })),
  translateDeco,
)(({ translate, total }) => (
  <div>
    {translate("titleContent.listVehicle")}
    <div
      style={{
        fontSize: "12px",
        lineHeight: "22px",
        color: "rgba(32, 48, 72, 0.6)",
        fontFamily: "IBM Plex Sans",
      }}
    >
      {translate("resources.vehicles.total", {
        total,
      })}
    </div>
  </div>
));

//const BranchTextField = genRemoteV2Field('vehicle-marks', 'title', 'code');

//const SubBranchTextField = genRemoteV2Field('vehicle-models', 'title', 'code');

//const SeatTextField = genRemoteV2Field('vehicle-seats', 'title', 'value');

export const VehicleList = withStyles(listStyles)(
  translateDeco(({ translate, classes, dataProvider, ...props }) => (
    <List
      {...props}
      bulkActions={false}
      pagination={<DefaultPagination />}
      bulkActionButtons={false}
      actions={
        <ListActions
          dataProvider={dataProvider}
          labelButtonExport="label.button.export"
          hasExport
        />
      }
      filters={
        <VehicleFilter
          placeholder={`${translate("placeholder.searchVehicle")}`}
        />
      }
      title={<VehicleTitle />}
      sort={{ field: 'time', order: 'DESC' }}
      hasCreate={false}
      perPage={10}
      cardProps={{
        style: {
          backgroundColor: "transparent",
          overflow: "visible",
          height: "calc(100% - 14px)",
        },
      }}
    >
      <Responsive
        xsmall={<MobileGrid />}
        medium={
          <Datagrid
           
          >
            <AvatarStatus
              source="user"
              type="users"
              picSource={["user","url_avatar"]}
              statusSource={["user","is_online"]}
              textSrc={["user","fullname"]}
            />
            <TextField source="type" />
            <TextField source="text" />
            <TextField source="url_ref" />
            <TimeField   sortable={true} source="time" />
            {/* <VehicleChipStatus source={models.vehicle.state} /> */}
            {/*}<EditBar toggleStatusSrc="status" hasDelete hasEdit />*/}
          </Datagrid>
        }
      />
    </List>
  )),
);

const editStyles = {
  textInput: { width: "100%" },
  address: { maxWidth: 544 },
  zipcode: { display: "inline-block" },
  city: { display: "inline-block", marginLeft: 32 },
  comment: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

export const VehicleEdit = ({ dataProvider, ...props }) => (
  <Edit
    title={<Title title="label.header.show_vehicle" hasTranslate />}
    {...props}
    hasShow={false}
  >
    <SimpleForm redirect="list">
      <CoalesceForm
        dataProvider={dataProvider}
        id="vehicle"
        metas={vehicleEditMetas}
      />
    </SimpleForm>
  </Edit>
);

export const VehicleShow = ({ history, ...rest }) => (
  <Show
    title={<Title title="label.header.show_vehicle" hasTranslate />}
    prependBlock={<ShowFormPrependBlock />}
    {...rest}
  >
    <CoalesceShow id="vehicle" metas={vehicleShowMetas} />
  </Show>
);

const CancelBtn = translateDeco(({ history, translate }) => (
  <Button variant="contained" onClick={() => history.goBack()}>
    {translate("label.button.cancel")}
  </Button>
));

const ShowFormPrependBlock = props => <BackHistoryBtn {...props} />;
const CreateFormPrependBlock = props => <BackToListBtn {...props} />;

export const VehicleCreate = withStyles(editStyles)(
  ({ dataProvider, history, basePath, ...props }) => (
    <Create
      title={<Title title="label.header.create_vehicle" hasTranslate />}
      redirect="list"
      prependBlock={<CreateFormPrependBlock basePath={basePath} />}
      {...props}
    >
      <SimpleForm toolbar={<Toolbar right={<CancelBtn history={history} />} />}>
        <CoalesceForm
          id="vehicle"
          metas={formMetas}
          dataProvider={dataProvider}
        />
      </SimpleForm>
    </Create>
  ),
);
