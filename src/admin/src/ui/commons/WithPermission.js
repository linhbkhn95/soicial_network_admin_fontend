import React, { Component } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import { getPermission, isLogged } from '~/store/selectors/auth';
import { checkIfNotNullOrUnd } from '~/utils';
import { userCheck } from 'react-admin';
import Skeleton from 'react-loading-skeleton';
import { Redirect } from 'react-router-dom';
const isEmptyChildren = children => React.Children.count(children) === 0;

export class WithPermission extends Component {
  static propTypes = {
    authParams: PropTypes.object,
    location: PropTypes.object,
    render: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    userCheck: PropTypes.func,
  };

  componentWillMount() {
    warning(
      !(
        this.props.render &&
        this.props.children &&
        !isEmptyChildren(this.props.children)
      ),
      'You should not use both <WithPermissions render> and <WithPermissions children>; <WithPermissions children> will be ignored',
    );
    this.checkAuthentication(this.props);
  }

  checkAuthentication(params) {
    const { userCheck, authParams, location } = params;
    userCheck(authParams, location && location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location !== this.props.location ||
      nextProps.authParams !== this.props.authParams ||
      nextProps.isLoggedIn !== this.props.isLoggedIn
    ) {
      this.checkAuthentication(nextProps);
    }
  }

  render() {
    const {
      authProvider,
      userCheck,
      isLoggedIn,
      render,
      children,
      staticContext,
      permission,
      approvedPermissions,
      ...props
    } = this.props;
    const aPermissionList = [].concat(approvedPermissions);
    // console.log(
    //   "render withpermission",
    //   authProvider,
    //   userCheck,
    //   isLoggedIn,
    //   render,
    //   children,
    //   staticContext,
    //   permission,
    //   approvedPermissions,
    // );
    if (permission === undefined) return <Skeleton />;
    if (
      approvedPermissions &&
      (!permission ||
        aPermissionList.every(aP => permission.toString() !== aP.toString()))
    ) {
      return <Redirect key="login" to={permission == 1 ? '/users' : '/map'} />;
    }
    if (render) {
      return render({ permission, ...props });
    }
    if (children) {
      return children({ permission, ...props });
    }
  }
}

export const FirstResourceWithPermission = connect(state => ({
  permission: getPermission(state),
}))(({ permission, resources, ...rest }) => {
  if (resources && Array.isArray(resources)) {
    const matchedResource = resources.find(
      resource =>
        checkIfNotNullOrUnd(resource && resource.permissions) &&
        []
          .concat(resource.permissions)
          .some(aPermission => aPermission === permission),
    );
    return (
      matchedResource &&
      matchedResource.component &&
      React.cloneElement(matchedResource.component, { ...rest })
    );
  }
  return null;
});

const mapStateToProps = state => ({
  isLoggedIn: isLogged(state),
  permission: getPermission(state),
});

export default compose(
  getContext({
    authProvider: PropTypes.func,
  }),
  connect(
    mapStateToProps,
    { userCheck },
  ),
)(WithPermission);
