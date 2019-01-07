import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { translate } from "react-admin";
import { capitalizeFirstLetter } from "~/utils";
const styles = {
  root: {
    marginTop: 10,
    marginBottom: 10,
  },
  label: {},
};

const LabelField = translate(
  withStyles(styles)(
    ({ classes, label, children, translate, notTranslate }) => {
      const renderedLabel = notTranslate ? label : translate(label);
      return (
        <div className={classes.root}>
          {label ? (
            <div className="fontstyle-h5">
              {capitalizeFirstLetter(renderedLabel)}
            </div>
          ) : null}
          {React.cloneElement(children, { style: { marginTop: 6 } })}
        </div>
      );
    },
  ),
);

export default LabelField;
