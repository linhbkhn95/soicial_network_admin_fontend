import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classnames from 'classnames';
import { EditController } from 'ra-core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import DefaultActions from './EditActions';
import TitleForRecord from '../layout/TitleForRecord';
import CardContentInner from '../layout/CardContentInner';

const sanitizeRestProps = ({
  actions,
  children,
  className,
  crudGetOne,
  crudUpdate,
  data,
  hasCreate,
  hasEdit,
  hasList,
  hasShow,
  id,
  isLoading,
  resetForm,
  resource,
  title,
  translate,
  version,
  match,
  location,
  history,
  options,
  locale,
  permissions,
  undoable,
  ...rest
}) => rest;

export const EditView = ({
  actions,
  basePath,
  children,
  className,
  defaultTitle,
  hasList,
  hasShow,
  record,
  prependBlock,
  redirect,
  resource,
  save,
  title,
  version,
  history,
  ...rest
}) => {
  if (typeof actions === 'undefined' && hasShow) {
    actions = <DefaultActions />;
  }
  return (
    <div
      className={classnames('edit-page', className)}
      {...sanitizeRestProps(rest)}
    >
     {prependBlock?prependBlock: <IconButton style={{ marginLeft: -14 }} onClick={() => history.goBack()}>
        <ArrowBack />
      </IconButton>}
      <TitleForRecord
        title={title}
        record={record}
        defaultTitle={defaultTitle}
      />
      <div id="react-admin-title" />
      {actions && (
        <div>
          {React.cloneElement(actions, {
            basePath,
            data: record,
            hasShow,
            hasList,
            resource,
          })}
        </div>
      )}
      {record ? (
        React.cloneElement(children, {
          basePath,
          record,
          redirect:
            typeof children.props.redirect === 'undefined'
              ? redirect
              : children.props.redirect,
          resource,
          save,
          version,
        })
      ) : (
        <CardContent>&nbsp;</CardContent>
      )}
    </div>
  );
};

EditView.propTypes = {
  actions: PropTypes.element,
  basePath: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string,
  defaultTitle: PropTypes.any,
  hasList: PropTypes.bool,
  hasShow: PropTypes.bool,
  record: PropTypes.object,
  redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  resource: PropTypes.string,
  save: PropTypes.func,
  title: PropTypes.any,
  version: PropTypes.number,
};

/**
 * Page component for the Edit view
 *
 * The `<Edit>` component renders the page title and actions,
 * fetches the record from the data provider.
 * It is not responsible for rendering the actual form -
 * that's the job of its child component (usually `<SimpleForm>`),
 * to which it passes pass the `record` as prop.
 *
 * The `<Edit>` component accepts the following props:
 *
 * - title
 * - actions
 *
 * Both expect an element for value.
 *
 * @example
 *     // in src/posts.js
 *     import React from 'react';
 *     import { Edit, SimpleForm, TextInput } from 'react-admin';
 *
 *     export const PostEdit = (props) => (
 *         <Edit {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     // in src/App.js
 *     import React from 'react';
 *     import { Admin, Resource } from 'react-admin';
 *
 *     import { PostEdit } from './posts';
 *
 *     const App = () => (
 *         <Admin dataProvider={...}>
 *             <Resource name="posts" edit={PostEdit} />
 *         </Admin>
 *     );
 *     export default App;
 */
const Edit = props => (
  <EditController {...props}>
    {controllerProps => <EditView {...props} {...controllerProps} />}
  </EditController>
);

Edit.propTypes = {
  actions: PropTypes.element,
  children: PropTypes.node,
  className: PropTypes.string,
  hasCreate: PropTypes.bool,
  hasEdit: PropTypes.bool,
  hasShow: PropTypes.bool,
  hasList: PropTypes.bool,
  id: PropTypes.any.isRequired,
  resource: PropTypes.string.isRequired,
  title: PropTypes.any,
};

export default Edit;