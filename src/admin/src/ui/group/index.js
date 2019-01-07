import React from "react";
import PropTypes from "prop-types";
import { models } from "data-generator";
import ListActions from "~/utils/input/ListActions";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AvatarStatus from '~/ui/commons/AvatarStatus';

import {
  validateEmail,
  validateFullname,
  validatePhone,
} from "~/utils/validators";
import {
  Create,
  Show,
  Datagrid,
  List,
  NumberField,
  Responsive,
  SimpleForm,
  TextField,
  translate as translateDeco,
  Toolbar,
  Filter,
  // SaveButton,
  // ListActions,
} from "react-admin";
import SaveButton from "~/utils/input/button/ButtonSave";
import "./index.css";
import ContractField from "./components/ContractField";
import TypeFleet from "./components/TypeFleet";

import formMetas, { fleetShowMetas } from "./components/formMetas";
import CoalesceForm from "./components/CoalesceForm";
import CoalesceShow from "./components/CoalesceShow";
import DefaultPagination from "~/ui/commons/DefaultPagination";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/LocalTaxi";
import Button from "@material-ui/core/Button";
import Title from "~/ui/commons/Title";
import MobileGrid from "./components/MobileGrid";
import { getListTotal } from "~/store/selectors";
import { connect } from "react-redux";
import EditBar from "~/ui/commons/EditBar";

import FormPrependBlock from "~/ui/commons/dialog/FormPrependBlock";
import FleetEdit from "./EditPage";
import formStyle from "./formStyle";
import { history } from "../../utils";
// import BackToListBtn from '~/ui/commons/Buttons/BackToListBtn';
import FullnameField from "~/ui/commons/FullnameField";
import SearchInput from "../commons/SearchInput";
import DirtyCheckOnChangeRoute from "../commons/DirtyCheckOnChangeRoute";
export const VisitorIcon = Icon;

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

const FleetTitle = connect(state => ({
  total: getListTotal(state, "fleets"),
}))(
  translateDeco(({ total, translate }) => (
    <div>
      {translate("titleContent.listFleet")}
      <div
        style={{
          fontSize: "14px",
          lineHeight: "22px",
          color: "rgba(32, 48, 72, 0.6)",
          fontFamily: "IBM Plex Sans",
        }}
      >
        {translate("text.subfleet")}
      </div>
    </div>
  )),
);
const filterStyles = {
  searchInput: {
    marginTop: 1,
    marginBottom: 0,
    width: 350,
  },
};
const ListFilter = withStyles(filterStyles)(props => (
  <Filter {...props}>
    <SearchInput
      placeholder={props.placeholder}
      source="_keyword"
      alwaysOn
      options={{ variant: "outlined" }}
    />
  </Filter>
));
export const GroupList = withStyles(listStyles)(
  translateDeco(({ translate, ...props }) => (
    <List
      {...props}
      bulkActions={false}
      pagination={<DefaultPagination />}
      bulkActionButtons={false}
      actions={
        <ListActions
          labelButtonCreate={translate("label.button.createFleetNew")}
          hasCreate={true}
        />
      }
      filters={
        <ListFilter placeholder={translate("placeholder.searchFleet")} />
      }
      title={<FleetTitle />}
      sort={{ field: "createdAt", order: "DESC" }}
      // hasCreate={false}
      perPage={10}
      cardProps={{
        style: {
          backgroundColor: "transparent",
          overflow: "visible",
          height: "calc(100% - 14px)",
        },
      }}
    >
      <Datagrid>
        <TextField source={models.fleet.id} />
        <AvatarStatus
              source="group"
              type="groups"
              picSource={[
                // models.drives.owner,
                "image",
              ]}
              statusSource={[
                // models.vehicle.owner,
               "status"
              ]}
              textSrc={[
                "groupname"
              ]}
            />
        <TypeFleet source={models.fleet.type} />
        <FullnameField source="groupname" />
        <TextField source={"title"} />
        <TextField source={"police"} />
        <TextField source="desc" />
        <EditBar
          // basePathSwitch="changeStatus"
          toggleStatusSrc="status"
          // hasDelete
          hasEdit
          hasDialogConfirm={true}
          dataProvider={props.dataProvider}
          titleDialog={translate("text.titleDialogDisactiveFleet")}
          textConfirmDialog={translate("text.textConfirmDialogFleet")}
          textButtonYes={translate("resources.fleets.buttons.ok")}
          textButtonNo={translate("resources.fleets.buttons.cancel")}
          hasSwitch
        />
      </Datagrid>
    </List>
  )),
);

export { FleetEdit };

const ShowFormPrependBlock = () => (
  <IconButton style={{ marginLeft: -14 }} onClick={() => history.goBack()}>
    <ArrowBack />
  </IconButton>
);

export const FleetShow = ({ ...rest }) => (
  <Show
    title={<Title title="label.header.show_fleet" hasTranslate />}
    prependBlock={<ShowFormPrependBlock />}
    {...rest}
  >
    <CoalesceShow id="fleet" metas={fleetShowMetas} />
  </Show>
);

const CancelBtn = translateDeco(({ translate }) => (
  <Button variant="contained" onClick={() => history.goBack()}>
    {translate("label.button.cancel")}
  </Button>
));

const PostCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      style={{ fontWeight: "bold" }}
      label="label.button.createFleet"
      redirect="/fleets"
      disabled={props.invalid}
      submitOnEnter={true}
    />
  </Toolbar>
);
PostCreateToolbar.propTypes = {
  invalid: PropTypes.bool,
};

const validateFleetCreation = (values, props) => {
  const errors = {};
  const { translate } = props;
  // const vlidFullName =
  if (!values.name || (values.name && !values.name.trim())) {
    errors.name = [translate("validation.nameFleet")];
  }
  if (
    values.name &&
    values.name.trim() &&
    !validateFullname(values.name.trim())
  ) {
    errors.name = [translate("validation.failFullnameFleet")];
  }
  if (!values.email || !values.email.trim()) {
    errors.email = [translate("validation.email")];
  }
  if (values.email && !validateEmail(values.email.trim()))
    errors.email = [translate("validation.failEmail")];

  if (!values.phone) {
    errors.phone = [translate("validation.phone")];
  }
  if (values.phone && !validatePhone(values.phone)) {
    errors.phone = [translate("validation.failPhone")];
  }
  return errors;
};

export const FleetCreate = withStyles(formStyle)(
  ({ dataProvider, classes, history, basePath, ...props }) => (
    <Create
      title={<Title title="label.header.createFleet" hasTranslate />}
      redirect="list"
      prependBlock={
        <FormPrependBlock
          showPrompt={true}
          history={history}
          basePath={basePath}
        />
      }
      {...props}
    >
      <SimpleForm
        validate={validateFleetCreation}
        toolbar={
          <PostCreateToolbar
            {...this.props}
            right={
              <CancelBtn
                className={classes.buttonCancel}
                style={{ fontWeight: "bold !important" }}
              />
            }
          />
        }
      >
        <CoalesceForm
          history={history}
          id="fleet"
          metas={formMetas}
          dataProvider={dataProvider}
        />
      </SimpleForm>
    </Create>
  ),
);
