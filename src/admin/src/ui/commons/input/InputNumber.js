import React from 'react';
import NumberFormat from 'react-number-format';
import { addField } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

const styles = theme => ({
  date: {
    fontSize: '14px',
  },
  input: {
    fontSize: '14px',
    width: '100%',
  },
});

class InputNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  onChange = data => {
    console.log('data', data);
    if (data.value >= 0) {
      this.setState({
        value: data.value,
      });
      this.props.input &&
        this.props.input.onChange &&
        this.props.input.onChange(data.value);
    }
  };
  componentDidMount() {
    let { meta } = this.props;
    if (meta.initial && parseInt(meta.initial) >= 0)
      this.setState({ value: meta.initial });
  }
  render() {
    let { classes, placeholder } = this.props;
    return (
      <NumberFormat
        value={this.state.value}
        // displayType={"text"}
        thousandSeparator={true}
        prefix={''}
        placeholder={placeholder}
        isNumericString={true}
        onValueChange={this.onChange}
        className="input-number-format-custom"
      />
    );
  }
}
InputNumber.propTypes = {
  onChange: PropTypes.func,
};
InputNumber.defaultProps = {
  onChange: () => {},
};
export default compose(
  addField,
  withStyles(styles),
)(InputNumber);
