import React from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { crudUpdate } from "react-admin";
import get from "lodash/get";
import DialogConfirm from "./dialog/DialogConfirm";
@connect(
  () => ({}),
  { crudUpdate },
)
export default class SwitchStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalConfirm: false,
    };
  }

  reverseStatusVal = val => {
    const { meta } = this.props;
    const { ON = 1, OFF = 0 } = meta;
    return val === ON ? OFF : ON;
  };

  onToggle = () => {
    const {
      statusSrc,
      record,
      // basePath,
      // resource,
      hasDialogConfirm,
      // id,
    } = this.props;
    // console.log('record====>',record)
    // const currentStatusValue = get(record, statusSrc);
    // this.props.crudUpdate(
    //   resource,
    //   id,
    //   {
    //     ...record,
    //     [statusSrc]: this.reverseStatusVal(currentStatusValue),
    //   },
    //   {
    //     ...record,
    //     [statusSrc]: currentStatusValue,
    //   },
    //   basePath,
    //   'list',
    // );
    const currentStatusValue = get(record, statusSrc);

    if (hasDialogConfirm && currentStatusValue) {
      this.setState({ showModalConfirm: true });
    } else {
      this.accessData();
    }
  };

  disAgree = () => {
    this.setState({ showModalConfirm: false });
  };

  accessData() {
    const { statusSrc, record, basePath, resource, id } = this.props;
    console.log("record====>", record);
    const currentStatusValue = get(record, statusSrc);
    // const endpoint = resource + '/changeStatus';

    this.props.crudUpdate(
      resource,
      id,
      {
        ...record,
        [statusSrc]: this.reverseStatusVal(currentStatusValue),
        updateOnlyStatus: true,
      },
      {
        ...record,
        [statusSrc]: currentStatusValue,
      },
      basePath,
      "list",
    );
    //  const {dataProvider,resource,record,statusSrc} = this.props;
    //  const currentStatusValue = get(record, statusSrc);

    //  const endpoint = resource+'/changeStatus'
    //  dataProvider(UPDATE, endpoint, {
    //   id: record.id,
    //  data: {
    //     ...record,
    //     [statusSrc]: this.reverseStatusVal(currentStatusValue),
    //   },
    //   previousData:{
    //     ...record,
    //     [statusSrc]: currentStatusValue,
    //   },
    //  })
    // .then(response => console.log('responsedâdấdâd=====sswỉg',response));
    // console.log('responsedâdấdâd=====sswỉg',response)
  }
  agree = () => {
    this.accessData();
    this.setState({ showModalConfirm: false });
  };
  render() {
    const {
      disabled,
      meta = {},
      record,
      statusSrc,
      hasDialogConfirm,
    } = this.props;
    const { ON = 1 } = meta;
    return (
      <React.Fragment>
        <Switch
          checked={get(record, statusSrc) === ON}
          color="primary"
          disabled={disabled}
          onClick={this.onToggle}
        />
        {hasDialogConfirm ? (
          <DialogConfirm
            disAgree={this.disAgree}
            show={this.state.showModalConfirm}
            {...this.props}
            agree={this.agree}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
