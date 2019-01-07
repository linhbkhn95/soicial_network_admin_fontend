import React from "react";
import { models } from "data-generator";
import DefaultPagination from "~/ui/commons/DefaultPagination";
import FormPrependBlock from "~/ui/commons/dialog/FormPrependBlock";
import AvatarStatus from "~/ui/commons/AvatarStatus";

import {
  Create,
  Show,
  Datagrid,
  Edit,
  Filter,
  List,
  SimpleForm,
  TextField,
  translate as translateDeco,
  Toolbar,
} from "react-admin";

import Button from "@material-ui/core/Button";
import ListActions from "~/utils/input/ListActions";
import SaveButton from "~/utils/input/button/ButtonSave";

import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/SupervisedUserCircle";
import Title from "~/ui/commons/Title";
import { getListTotal } from "~/store/selectors";
import { connect } from "react-redux";
import BackHistoryBtn from "~/ui/commons/Buttons/BackHistoryBtn";

import CoalesceForm from "./components/CoalesceForm";
import CoalesceShow from "~/ui/commons/CoalesceShow";
import EditBar from "~/ui/commons/EditBar";
import FullnameField from "~/ui/commons/FullnameField";

import { userEditMetas, userCreateMetas, userShowMetas } from "./formMeta";
import {
  validateEmail,
  validateFullname,
  validatePhone,
} from "~/utils/validators";
import "./index.css";
import { history } from "../../utils";
import SearchInput from "../commons/SearchInput";

const { me } = models;

export const UserIcon = Icon;

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

const listStyles = {
  nb_commands: { color: "purple" },
};

const ListTitle = connect(state => ({
  total: getListTotal(state, "users") || 0,
}))(
  translateDeco(({ total, translate }) => (
    <div>
      {translate("titleContent.listUsers")}
      <div className="list-sub-header">{`${translate(
        "text.subuser",
      )}, ${translate("text.total")} ${total} ${translate("text.user")}
    `}</div>
    </div>
  )),
);

const ShowFormPrependBlock = props => <BackHistoryBtn {...props} />;

const CancelBtn = translateDeco(({ translate }) => (
  <Button
    style={{ background: "white", fontWeight: "bold" }}
    variant="contained"
    onClick={() => history.goBack()}
  >
    {translate("label.button.cancel")}
  </Button>
));
const validateUserCreation = (values, props) => {
  const errors = {};
  const { translate } = props;
  if (
    !values[me.fullName] ||
    (values[me.fullName] && !values[me.fullName].trim())
  ) {
    errors[me.fullName] = [translate("validation.fullnameUser")];
  }
  if (
    values[me.fullName] &&
    values[me.fullName].trim() &&
    !validateFullname(values[me.fullName].trim())
  ) {
    errors[me.fullName] = [translate("validation.failName")];
  }
  if (!values.email || !values.email.trim()) {
    errors.email = [translate("validation.email")];
  }
  if (values.email && !validateEmail(values.email.trim()))
    errors.email = [translate("validation.failEmail")];

  if (!values.phone) {
    errors.phone = [translate("validation.phoneUser")];
  }
  if (values.phone && !validatePhone(values.phone)) {
    errors.phone = [translate("validation.failPhone")];
  }
  return errors;
};

const PostCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      style={{ fontWeight: "bold" }}
      label="label.button.createUser"
      redirect="/users"
      disabled={props.invalid}
      submitOnEnter={true}
    />
  </Toolbar>
);

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton
      style={{ fontWeight: "bold" }}
      label="label.button.edit"
      redirect="/users"
      submitOnEnter={true}
      disabled={props.invalid}
    />
  </Toolbar>
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
  buttonCancel: {
    fontWeight: "bold !important",
  },
};
export const UserCreate = withStyles(editStyles)(
  ({ dataProvider, classes, history, basePath, ...props }) => (
    <Create
      title={<Title title="label.header.create_user" hasTranslate />}
      redirect="list"
      prependBlock={
        <FormPrependBlock
          showPrompt={true}
          history={history}
          basePath={basePath}
        />
      }
      {...props}
      dataProvider={dataProvider}
    >
      <SimpleForm
        validate={validateUserCreation}
        toolbar={
          <PostCreateToolbar
            {...this.props}
            right={
              <CancelBtn
                className={classes.buttonCancel}
                style={{ fontWeight: "bold !important" }}
                history={history}
              />
            }
          />
        }
      >
        <CoalesceForm
          dataProvider={dataProvider}
          id="user"
          metas={userCreateMetas}
        />
      </SimpleForm>
    </Create>
  ),
);

export const UserShow = ({ history, ...rest }) => (
  <Show
    title={<Title title="label.header.show_user" hasTranslate />}
    prependBlock={<ShowFormPrependBlock history={history} />}
    {...rest}
  >
    <CoalesceShow id="vehicle" metas={userShowMetas} />
  </Show>
);

export const UserEdit = withStyles(editStyles)(
  ({ dataProvider, history, classes, basePath, ...props }) => (
    <Edit
      prependBlock={
        <FormPrependBlock
          showPrompt={true}
          history={history}
          basePath={basePath}
        />
      }
      title={<Title title="label.header.show_user" hasTranslate />}
      {...props}
      hasShow={false}
    >
      <SimpleForm
        validate={validateUserCreation}
        redirect="list"
        toolbar={
          <PostEditToolbar
            history={history}
            // {...this.props} // WTF ?!
            right={
              <CancelBtn
                className={classes.buttonCancel}
                style={{ fontWeight: "bold !important" }}
                history={history}
              />
            }
          />
        }
      >
        <CoalesceForm
          dataProvider={dataProvider}
          id="user"
          metas={userEditMetas}
        />
      </SimpleForm>
    </Edit>
  ),
);

export const UserList = withStyles(listStyles)(
  translateDeco(({ translate, ...props }) => (
    <List
      {...props}
      bulkActions={false}
      pagination={<DefaultPagination />}
      actions={
        <ListActions
          labelButtonCreate={translate("label.button.createUser")}
          hasCreate={true}
        />
      }
      bulkActionButtons={false}
      filters={<ListFilter placeholder={translate("placeholder.searchUser")} />}
      title={<ListTitle />}
      sort={{ field: "created_at", order: "DESC" }}
      perPage={10}
      cardProps={{
        style: {
          backgroundColor: "transparent",
          overflow: "visible",
          height: "calc(100% - 14px)",
        },
      }}
    >
      <Datagrid rowClick="edit">
        <AvatarStatus
          source={models.me.fullName}
          type="drivers"
          picSource={["url_avatar"]}
          statusSource={["is_online"]}
          textSrc={[ "fullname"]}
        />
        <FullnameField source="username" />

        {/* <TextField
          label={translate('label.field.' + models.me.fullName + '__grid')}
          source={models.me.fullName}
          sourceData={[models.me.fullName]}
        /> */}
        {/* <FullnameField
          label={translate('label.field.' + models.me.fullName + '__grid')}
          sourceData={[models.me.fullName]}
          source={models.me.fullName}
        /> */}

        {/* <AvatarStatus
          type="users"
          resource="user"
          source="user"
          picSource={models.me.avatar}
          textSrc={models.me.fullName}
          to="show"
        /> */}
        <TextField source={models.me.phone} />
        <TextField source={models.me.email} />
        <TextField source="address" />

        {/* <TextField
          source={models.me.company}
          sourceData={[models.me.company, models.company.name]}
        /> */}
        <EditBar
          toggleStatusSrc={models.me.status}
          // hasDelete
          hasEdit
          hasSwitch
          hasDialogConfirm={true}
          dataProvider={props.dataProvider}
          titleDialog={translate("text.titleDialogDisactiveUser")}
          textConfirmDialog={translate("text.textConfirmDialogDeleteUser")}
          textButtonYes={translate("label.button.agreeDelete")}
          textButtonNo={translate("label.button.disAgreeDelete")}
        />
      </Datagrid>
    </List>
  )),
);
