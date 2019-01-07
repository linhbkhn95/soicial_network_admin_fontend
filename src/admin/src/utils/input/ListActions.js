import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import { sanitizeListRestProps } from 'ra-core';

import { CardActions } from 'react-admin';
import ImportButton from './button/ButtonImport';
import CreateButton from './button/ButtonCreate';
import ExportButton from './button/ButtonExport';

const Actions = ({
  bulkActions,
  currentSort,
  className,
  resource,
  filters,
  displayedFilters,
  exporter,
  filterValues,
  hasCreate,
  hasExport,
  hasImport,
  basePath,
  selectedIds,
  onUnselectItems,
  showFilter,
  labelButtonCreate,
  translate,
  labelButtonExport,
  dataProvider,
  ...rest
}) => (
  <CardActions className={className} {...sanitizeListRestProps(rest)}>
    {bulkActions &&
      cloneElement(bulkActions, {
        basePath,
        filterValues,
        resource,
        selectedIds,
        onUnselectItems,
      })}
    {filters &&
      cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: 'button',
      })}
    {hasImport && (
      <ImportButton resource={resource} dataProvider={dataProvider} />
    )}
    {hasExport && (
      <ExportButton
        resource={resource}
        sort={currentSort}
        label={labelButtonExport}
        filter={filterValues}
        exporter={exporter}
        dataProvider={dataProvider}
        variant="contained"
        style={{
          padding: '7px 16px',
        }}
      />
    )}
    {hasCreate && (
      <CreateButton
        label={labelButtonCreate}
        basePath={basePath}
        variant="contained"
      />
    )}
  </CardActions>
);

Actions.propTypes = {
  bulkActions: PropTypes.node,
  basePath: PropTypes.string,
  className: PropTypes.string,
  currentSort: PropTypes.object,
  displayedFilters: PropTypes.object,
  exporter: PropTypes.func,
  filters: PropTypes.element,
  filterValues: PropTypes.object,
  hasCreate: PropTypes.bool,
  resource: PropTypes.string,
  onUnselectItems: PropTypes.func.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.any),
  showFilter: PropTypes.func,
  hasImport: PropTypes.bool,
  hasExport: PropTypes.bool,
};

Actions.defaultProps = {
  selectedIds: [],
};

export default onlyUpdateForKeys([
  'resource',
  'filters',
  'displayedFilters',
  'filterValues',
  'selectedIds',
])(Actions);
