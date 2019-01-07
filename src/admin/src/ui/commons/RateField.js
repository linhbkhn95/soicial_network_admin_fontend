import React from "react";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import get from "lodash/get";
import StartRateIcon from "@material-ui/icons/StarRate";
import Tooltip from "@material-ui/core/Tooltip";
import { translate as translateDeco } from "react-admin";
import compose from "recompose/compose";

const styles = theme => ({
  avatar: {
    marginRight: 10,
  },
  pictureContainer: {
    position: "relative",
  },
  statusInd: {
    position: "absolute",
    bottom: -1,
    right: 9,
  },
  icon: {
    // margin: theme.spacing.unit,
    fontSize: 28,
    color: "rgb(255, 228, 1)",
    float: "left",
  },
  valueRate: {
    float: "right",
    marginTop: "4px",
    fontSize: "14px",
  },
});
class RateField extends React.Component {
  render() {
    let { classes,source, record,translate,type } = this.props;
    let valueRate = record[source];

    if (valueRate)
      return (
        <div title="Số sao hiện tại của tài xế trên App" className="d-flex flex-row align-items-center">
          <div className={classes.pictureContainer}>
            {type=="star"? <StartRateIcon className={classes.icon} />
            :<i className="far fa-thumbs-up"></i>}
            <div className={classes.valueRate}>{valueRate}</div>
          </div>
        </div>
      );
    else return null;
  }
}
export default 
 withStyles(styles)
 (RateField);
