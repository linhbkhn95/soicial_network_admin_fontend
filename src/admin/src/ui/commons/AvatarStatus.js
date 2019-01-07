/* eslint-disable */

import React from "react";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AlertTooltip from "~/ui/commons/AlertTooltip";
import get from "lodash/get";
import Avatar from "@material-ui/core/Avatar";
// import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import { linkToRecord } from "react-admin";

//

const styles = {
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
};

const AvatarStatus = ({
  classes,
  record = {},
  type,
  picSource,
  statusSource,
  textSrc,
  basePath,
  warningMessage = [],
  errorMessage = [],
  toPage,
  linkTo,
  online_status,
  checkNullSource,
  source
}) => {
  if(checkNullSource&&!record[source]){
      return null
  }
  let profilePic = picSource && get(record, picSource);
  let status = statusSource ? get(record, statusSource) : undefined;
  let text = (textSrc && get(record, textSrc)) || "";
  if(text) text = text?text.trim():'';
  if (profilePic === undefined && status === undefined && text === undefined) {
    return "";
  }

  profilePic = profilePic
    ? profilePic
    : type == "drivers" || type == "users"
      ? "/images/user_default.png":type=="groups"?"/images/group.png"
      : "/images/car_default.png";

  if (errorMessage && errorMessage.length > 0) {
    errorMessage = errorMessage.concat(warningMessage);
  }

  if (online_status != null) {
    status = online_status;
  }
  const link = linkTo || (toPage && linkToRecord(basePath, record.id, toPage));

  return (
    <div
      style={{ justifyContent: "space-between" }}
      className="d-flex flex-row align-items-center"
    >
      <div style={{ alignItems: "center" }} className="d-flex">
        {" "}
        <div className={classes.pictureContainer}>
          <Avatar src={profilePic} className={classes.avatar} />
          {status !== undefined && (
            <i
              className={classnames(
                "fa fa-circle",
                { online: status },
                { offline: !status },
                classes.statusInd,
              )}
            />
          )}
        </div>
        {link ? <Link to={link}>{text}</Link> : <span>{text}</span>}
      </div>
      {warningMessage &&
        warningMessage.length > 0 &&
        !(errorMessage && errorMessage.length > 0) && (
          <AlertTooltip
            message={
              warningMessage.length == 1 ? (
                <div> {warningMessage[0]}</div>
              ) : (
                <React.Fragment>
                  {warningMessage.map((message, idx) => (
                    <li key={`warning-${idx}`}> {message}</li>
                  ))}
                </React.Fragment>
              )
            }
            type="warning"
          />
        )}
      {errorMessage &&
        errorMessage.length > 0 && (
          <AlertTooltip
            message={
              errorMessage.length == 1 ? (
                <div> {errorMessage[0]}</div>
              ) : (
                <React.Fragment>
                  {errorMessage.map((message, idx) => (
                    <li key={`error-${idx}`}>{message}</li>
                  ))}
                </React.Fragment>
              )
            }
            type="error"
          />
        )}
    </div>
  );
};

export default withStyles(styles)(AvatarStatus);
