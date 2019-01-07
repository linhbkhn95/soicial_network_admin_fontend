import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { translate as translateDeco } from "react-admin";
import moment from "moment";
export default class TimeField extends React.Component {
  static propTypes = {
    record: PropTypes.object,
    translate: PropTypes.func,
    // source: PropTypes.string,
  };
  render() {
    const { record, source, translate } = this.props;
    let time = record[source];
    console.log('timeeee',time)
    // return  <TextField  {...this.props} record={vehicle} suffix={` ${translate("text.seats")}`} />;
    return (
      <div>
        {moment(time)
          .lang("vi")
          .fromNow()}
      </div>
    );
  }
}
