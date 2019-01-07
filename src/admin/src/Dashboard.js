import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { connect } from 'react-redux';

@connect(_ => ({
  identity: _.auth.identity,
}))
class Index extends React.Component {
  componentDidMount() {
    const { identity } = this.props;
    if (identity) {
      if (identity.role && identity.role === 1) {
        location.href = '/fleets';
      } else {
        location.href = '/map';
      }
    }
  }

  render() {
    return <CircularProgress />;
  }
}

export default Index;
