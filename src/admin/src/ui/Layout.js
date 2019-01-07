import React from 'react';
import Layout from './LayoutBase';
import CustomSidebar from './Sidebar';

const CustomLayout = props => (
  <Layout sidebar={CustomSidebar} noAppBar {...props} />
);

export default CustomLayout;
