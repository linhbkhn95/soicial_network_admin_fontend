import React from "react";
import { SelectInput } from "react-admin";
import { models } from "data-generator";
import RestfulUtils from "~/utils/RestfulUtils";
import { GET_LIST } from "react-admin";
import Select from "react-select";
// import 'react-select/dist/react-select.css'
import PropTypes from "prop-types";
import { addField } from "react-admin";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ReactSelect extends React.Component {
  state = {
    options: [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ],
    selectedOption: null,
    selected: false,
  };
  handleChange = selectedOption => {
    console.log("hanldeChnagedadad", selectedOption);
    this.setState({ selectedOption, selected: true });
    this.props.input &&
      this.props.input.onChange &&
      this.props.input.onChange(selectedOption ? selectedOption.value : "");

    // this.props.onChange(this.props.source,{target:{value:selectedOption?selectedOption.value:'',}})
  };
  // handleBlur = eventOrValue => {
  //   this.props.onBlur(eventOrValue);
  //   this.props.input.onBlur(eventOrValue);
  // };

  // handleFocus = event => {
  //   this.props.onFocus(event);
  //   this.props.input.onFocus(event);
  // };

  // handleChange = eventOrValue => {
  //   this.props.onChange(eventOrValue);
  //   this.props.input.onChange(eventOrValue);
  // };

  //convert sang kiểu định dạng của react-select
  convertToOption(data) {
    let {
      optionValue, //thuộc tính làm value
      optionLabel, //thuộc tính làm label
      optionLabelAtribute, // thuộc tính bổ  sung cho label
      classNameOption, //class của option select
    } = this.props;
    return data.map(item => {
      return {
        label:
          item[optionLabelAtribute] && item[optionLabelAtribute] != "null"
            ? item[optionLabel] + " - " + item[optionLabelAtribute]
            : item[optionLabel],
        value: item[optionValue],
        data: item,
        className: classNameOption,
      };
    });
  }

  componentDidMount() {
    const {
      urlApi,
      optionValue,
      dataProvider,
      source,
      params,
      input,
    } = this.props;
    let self = this;
    if (dataProvider) {
      dataProvider(GET_LIST, urlApi, {
        pagination: {
          perPage: 1000,
        },
        data: params,
      }).then(response => {
        if (response.data && response.data.length > 0) {
          let options = self.convertToOption(response.data);
          if (
            input &&
            input.value &&
            input.value != "null" &&
            options &&
            options.length > 0
          ) {
            let rs = options.filter(i => i.value == input.value);
            if (rs && rs.length > 0) {
              self.setState({ options, selectedOption: rs[0] });
            } else {
              self.setState({ options });
            }
          } else {
            self.setState({ options });
          }
        }
      });
    }

    //  RestfulUtils.get(urlApi).then((resdata)=>{
    //      if(resdata){
    //         let options =  this.convertToOption(resdata.items);
    //         self.setState({options})
    //      }
    //  })
  }
  // componentWillReceiveProps() {
  //   console.log("componentWillReceiveProps reactadadadasdad", this.props);
  // }
  render() {
    const { selectedOption, selected, options } = this.state;
    const {
      className,
      input,
      isRequired,
      label = false,
      meta,
      resource,
      source,
      type,
      // ...rest
    } = this.props;
    console.log("propsaaa", isRequired);
    return (
      <React.Fragment>
        <Select
          {...this.props}
          dataValue={this.props.value}
          dateeValue={this.props.initial}
          options={options}
          value={selectedOption}
          onChange={this.handleChange}
        />
        {selected ? <p className="text-error">{meta && meta.error}</p> : null}
      </React.Fragment>
    );
  }
}
ReactSelect.propTypes = {
  onChange: PropTypes.func,
};
ReactSelect.defaultProps = {
  onChange: () => {},
};
export default addField(ReactSelect);
