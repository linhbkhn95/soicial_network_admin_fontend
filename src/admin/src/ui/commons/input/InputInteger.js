import React from "react";
import NumberFormat from "react-number-format";
import { addField } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import compose from "recompose/compose";

const styles = theme => ({
  date: {
    fontSize: "14px",
  },
  input: {
    fontSize: "14px",
    width: "100%",
  },
});

@addField
@withStyles(styles)
export default class InputInteger extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  state = {
    value: null,
  };

  onChange = data => {
    if (data.value >= 0) {
      this.setState(
        {
          value: data.value,
        },
        () => {
          this.props.input &&
            this.props.input.onChange &&
            this.props.input.onChange(data.value);
        },
      );
    }
  };

  componentDidMount() {
    let { meta } = this.props;
    if (meta.initial && parseInt(meta.initial, 10) >= 0)
      this.setState({ value: meta.initial });
  }

  render() {
    let { classes, placeholder } = this.props;
    return (
      <div style={{display:"flex"}} >
        <NumberFormat
          value={this.state.value}
          // displayType={"text"}
          thousandSeparator={true}
          prefix={""}
          placeholder={placeholder}
          isNumericString={true}
          onValueChange={this.onChange}
          className="input-number-format-custom"
          decimalScale={0}
        />
      </div>
    );
  }
}
