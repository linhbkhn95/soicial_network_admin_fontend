/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Card';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ListController, getListControllerProps } from 'ra-core';

import Title from '../layout/Title';
import ListToolbar from './ListToolbar';
import DefaultPagination from './Pagination';
import DefaultBulkActionButtons from '../button/BulkDeleteButton';
import BulkActionsToolbar from './BulkActionsToolbar';
import DefaultActions from './ListActions';
import defaultTheme from '../defaultTheme';

const styles = {
  root: {
    height: '100%',
  },
  card: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    zIndex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
    color: '#111111',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  noResults: { padding: 20 },
};

const sanitizeRestProps = ({
  actions,
  basePath,
  bulkActions,
  changeListParams,
  children,
  classes,
  className,
  crudGetList,
  currentSort,
  data,
  defaultTitle,
  displayedFilters,
  exporter,
  filter,
  filterDefaultValues,
  filters,
  filterValues,
  hasCreate,
  hasEdit,
  hasList,
  hasShow,
  hideFilter,
  history,
  ids,
  isLoading,
  locale,
  location,
  match,
  onSelect,
  onToggleItem,
  onUnselectItems,
  options,
  page,
  pagination,
  params,
  permissions,
  perPage,
  push,
  query,
  refresh,
  resource,
  selectedIds,
  setFilters,
  setPage,
  setPerPage,
  setSelectedIds,
  setSort,
  showFilter,
  sort,
  theme,
  title,
  toggleItem,
  total,
  translate,
  version,
  ...rest
}) => rest;

export const ListView = ({
  // component props
  actions = <DefaultActions />,
  filters,
  bulkActions, // deprecated
  bulkActionButtons = <DefaultBulkActionButtons />,
  pagination = <DefaultPagination />,
  // overridable by user
  children,
  prependBlock,
  className,
  classes = {},
  exporter,
  title,
  ...rest
}) => {
  const { defaultTitle, version, cardProps } = rest;
  const controllerProps = getListControllerProps(rest);

  return (
    <div
      className={classnames('list-page', classes.root, className)}
      {...sanitizeRestProps(rest)}
    >
      {prependBlock}
      <Title title={title} defaultTitle={defaultTitle} />

      <Card
        className={classes.card}
        elevation={0}
        style={{ backgroundColor: 'transparent' }}
        {...cardProps}
      >
        <div className="d-flex flex-row justify-content-between">
          <span
            variant="title"
            color="inherit"
            className={'fontstyle-h2'}
            id="react-admin-title"
          />
          {(filters || actions) && (
            <ListToolbar
              filters={filters}
              {...controllerProps}
              actions={actions}
              bulkActions={bulkActions}
              exporter={exporter}
            />
          )}
        </div>
        {bulkActions !== false &&
          bulkActionButtons !== false &&
          bulkActionButtons &&
          !bulkActions && (
            <BulkActionsToolbar {...controllerProps}>
              {bulkActionButtons}
            </BulkActionsToolbar>
          )}
        <div key={version} style={{ height: 'calc(100% - 64px)' }}>
          <div style={{ height: 'calc(100% - 72px)' }}>
            {children &&
              React.cloneElement(children, {
                ...controllerProps,
                hasBulkActions:
                  bulkActions !== false && bulkActionButtons !== false,
              })}
          </div>
          <div style={{ height: '56px' }}>
            {pagination && React.cloneElement(pagination, controllerProps)}
          </div>
        </div>
      </Card>
    </div>
  );
};

ListView.propTypes = {
  actions: PropTypes.element,
  basePath: PropTypes.string,
  bulkActions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  bulkActionButtons: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  children: PropTypes.element,
  className: PropTypes.string,
  classes: PropTypes.object,
  currentSort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  data: PropTypes.object,
  defaultTitle: PropTypes.string,
  displayedFilters: PropTypes.object,
  exporter: PropTypes.func,
  filterDefaultValues: PropTypes.object,
  filters: PropTypes.element,
  filterValues: PropTypes.object,
  hasCreate: PropTypes.bool,
  hideFilter: PropTypes.func,
  ids: PropTypes.array,
  isLoading: PropTypes.bool,
  onSelect: PropTypes.func,
  onToggleItem: PropTypes.func,
  onUnselectItems: PropTypes.func,
  page: PropTypes.number,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  perPage: PropTypes.number,
  refresh: PropTypes.func,
  resource: PropTypes.string,
  selectedIds: PropTypes.array,
  setFilters: PropTypes.func,
  setPage: PropTypes.func,
  setPerPage: PropTypes.func,
  setSort: PropTypes.func,
  showFilter: PropTypes.func,
  title: PropTypes.any,
  total: PropTypes.number,
  translate: PropTypes.func,
  version: PropTypes.number,
  cardProps: PropTypes.object,
};

/**
 * List page component
 *
 * The <List> component renders the list layout (title, buttons, filters, pagination),
 * and fetches the list of records from the REST API.
 * It then delegates the rendering of the list of records to its child component.
 * Usually, it's a <Datagrid>, responsible for displaying a table with one row for each post.
 *
 * In Redux terms, <List> is a connected component, and <Datagrid> is a dumb component.
 *
 * Props:
 *   - title
 *   - perPage
 *   - sort
 *   - filter (the permanent filter to apply to the query)
 *   - actions
 *   - filters (a React Element used to display the filter form)
 *   - pagination
 *
 * @example
 *     const PostFilter = (props) => (
 *         <Filter {...props}>
 *             <TextInput label="Search" source="q" alwaysOn />
 *             <TextInput label="Title" source="title" />
 *         </Filter>
 *     );
 *     export const PostList = (props) => (
 *         <List {...props}
 *             title="List of posts"
 *             sort={{ field: 'published_at' }}
 *             filter={{ is_published: true }}
 *             filters={<PostFilter />}
 *         >
 *             <Datagrid>
 *                 <TextField source="id" />
 *                 <TextField source="title" />
 *                 <EditButton />
 *             </Datagrid>
 *         </List>
 *     );
 */
const List = props => (
  <ListController {...props}>
    {controllerProps => <ListView {...props} {...controllerProps} />}
  </ListController>
);

List.propTypes = {
  // the props you can change
  actions: PropTypes.element,
  bulkActions: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  children: PropTypes.node,
  classes: PropTypes.object,
  className: PropTypes.string,
  filter: PropTypes.object,
  filterDefaultValues: PropTypes.object,
  filters: PropTypes.element,
  pagination: PropTypes.element,
  perPage: PropTypes.number.isRequired,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  title: PropTypes.any,
  // the props managed by react-admin
  authProvider: PropTypes.func,
  hasCreate: PropTypes.bool.isRequired,
  hasEdit: PropTypes.bool.isRequired,
  hasList: PropTypes.bool.isRequired,
  hasShow: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  path: PropTypes.string,
  resource: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

List.defaultProps = {
  filter: {},
  perPage: 10,
  theme: defaultTheme,
};

export default withStyles(styles)(List);
