import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { ShowController } from 'ra-core';

import DefaultActions from './ShowActions';
import TitleForRecord from '../layout/TitleForRecord';
import CardContentInner from '../layout/CardContentInner';

const sanitizeRestProps = ({
  actions,
  title,
  children,
  className,
  crudGetOne,
  id,
  data,
  isLoading,
  resource,
  hasCreate,
  hasEdit,
  hasList,
  hasShow,
  translate,
  version,
  match,
  location,
  history,
  options,
  locale,
  permissions,
  ...rest
}) => rest;

export const ShowView = ({
  actions,
  basePath,
  children,
  className,
  defaultTitle,
  hasEdit,
  hasList,
  isLoading,
  prependBlock,
  record,
  resource,
  title,
  version,
  ...rest
}) => {
  //if (typeof actions === 'undefined' && hasEdit) {
  //actions = <DefaultActions />;
  //}
  return (
    <div
      className={classnames('show-page', className)}
      {...sanitizeRestProps(rest)}
    >
      {prependBlock}
      <TitleForRecord
        title={title}
        record={record}
        defaultTitle={defaultTitle}
      />
      <div id="react-admin-title" />
      <div style={{ opacity: isLoading ? 0.8 : 1 }}>
        {actions && (
          <CardContentInner>
            {React.cloneElement(actions, {
              basePath,
              data: record,
              hasList,
              hasEdit,
              resource,
            })}
          </CardContentInner>
        )}
        {record &&
          React.cloneElement(children, {
            resource,
            basePath,
            record,
            version,
          })}
      </div>
    </div>
  );
};

ShowView.propTypes = {
  actions: PropTypes.element,
  basePath: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string,
  defaultTitle: PropTypes.any,
  hasEdit: PropTypes.bool,
  hasList: PropTypes.bool,
  isLoading: PropTypes.bool,
  record: PropTypes.object,
  resource: PropTypes.string,
  title: PropTypes.any,
  version: PropTypes.number,
};

/**
 * Page component for the Show view
 *
 * The `<Show>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleShowLayout>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Show>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Show, SimpleShowLayout, TextField } from 'react-admin';
 *
 *     export const PostShow = (props) => (
 *         <Show {...props}>
 *             <SimpleShowLayout>
 *                 <TextField source="title" />
 *             </SimpleShowLayout>
 *         </Show>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostShow } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" show={PostShow} />
 *         </Admin>
 *     );
 *     export default App;
 */
const Show = props => (
  <ShowController {...props}>
    {controllerProps => <ShowView {...props} {...controllerProps} />}
  </ShowController>
);

Show.propTypes = {
  actions: PropTypes.element,
  children: PropTypes.element,
  className: PropTypes.string,
  hasCreate: PropTypes.bool,
  hasEdit: PropTypes.bool,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  id: PropTypes.any.isRequired,
  resource: PropTypes.string.isRequired,
  title: PropTypes.any,
};

export default Show;
