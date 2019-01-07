import React from 'react';
import { SelectInput } from 'react-admin';
import { models } from 'data-generator';
import RestfulUtils from '~/utils/RestfulUtils';
import { GET_LIST } from 'react-admin';

class SelectUtils extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
    };
  }
  componentDidMount() {
    const { urlApi, optionValue, dataProvider } = this.props;
    RestfulUtils.get(urlApi).then(resdata => {
      if (resdata) this.setState({ choices: resdata.items });
    });
    console.log('componentDidMount');

    // if(dataProvider){
    //     console.log('dataprovider',dataProvider)
    //     // dataProvider(GET_LIST,urlApi,{}).then((response)=>{
    //     //   console.log('assadas',response)

    //     //     if(response.items){
    //     //       console.log('responesssssss',response)
    //     //         self.setState({choices:response.items})
    //     //     }
    //     // });
    // }
  }

  render() {
    let { choices } = this.state;
    return <SelectInput choices={choices} {...this.props} />;
  }
}
export default SelectUtils;
