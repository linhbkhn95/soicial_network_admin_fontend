import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sanitizeListRestProps } from 'ra-core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import classnames from 'classnames';

import DatagridHeaderCell from './DatagridHeaderCell';
import DatagridBody from './DatagridBody';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    borderRadius: 0,
  },
  table: {
    tableLayout: 'auto',
  },
  tbody: {
    height: 'inherit',
  },
  headerCell: {
    padding: '0 12px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    textAlign: 'left',
    backgroundColor: '#F6F7F8',
    borderRight: '1px solid #E9EAED',
    '&first-child': {
      textAlign: 'center',
    },
    '&last-child': {
      borderRight: 0,
    },
  },
  checkbox: {},
  row: {},
  rowEven: {},
  rowOdd: {},
  rowCell: {
    padding: '0 12px',
    borderRight: '1px solid #E9EAED',
    '&:last-child': {
      padding: '0 12px',
      borderRight: '0px',
    },
  },
});

/**
 * The Datagrid component renders a list of records as a table.
 * It is usually used as a child of the <List> and <ReferenceManyField> components.
 *
 * Props:
 *  - styles
 *  - rowStyle
 *  - options (passed as props to <Table>)
 *  - headerOptions (passed as props to mui <TableHead>)
 *  - bodyOptions (passed as props to mui <TableBody>)
 *  - rowOptions (passed as props to mui <TableRow>)
 *
 * @example Display all posts as a datagrid
 * const postRowStyle = (record, index) => ({
 *     backgroundColor: record.nb_views >= 500 ? '#efe' : 'white',
 * });
 * export const PostList = (props) => (
 *     <List {...props}>
 *         <Datagrid rowStyle={postRowStyle}>
 *             <TextField source="id" />
 *             <TextField source="title" />
 *             <TextField source="body" />
 *             <EditButton />
 *         </Datagrid>
 *     </List>
 * );
 *
 * @example Display all the comments of the current post as a datagrid
 * <ReferenceManyField reference="comments" target="post_id">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="body" />
 *         <DateField source="created_at" />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceManyField>
 */
class Datagrid extends Component {
  updateSort = event => {
    event.stopPropagation();
    this.props.setSort(event.currentTarget.dataset.sort);
  };

  handleSelectAll = event => {
    const { onSelect, ids, selectedIds } = this.props;
    if (event.target.checked) {
      onSelect(
        ids.reduce(
          (idList, id) => (idList.includes(id) ? idList : idList.concat(id)),

          selectedIds,
        ),
      );
    } else {
      onSelect([]);
    }
  };

  render() {
    const {
      basePath,
      data,
      children,
      classes,
      className,
      currentSort,
      hasBulkActions,
      hover,
      ids,
      isLoading,
      resource,
      rowStyle,
      selectedIds,
      setSort,
      onSelect,
      onToggleItem,
      total,
      onRowClick,
      version,
      ...rest
    } = this.props;

    if (!isLoading && (ids.length === 0 || total === 0)) {
      return null;
    }

    const bodyProps = {};
    if (onRowClick) {
      bodyProps.onRowClick = onRowClick;
    }

    return (
      <Paper className={classes.root}>
        <Table
          className={classnames(classes.table, className)}
          wrapperStyle={{ maxHeight: 300 }}
          {...sanitizeListRestProps(rest)}
        >
          <TableHead>
            <TableRow className={classes.row}>
              {hasBulkActions && (
                <TableCell>
                  <Checkbox
                    className="select-all"
                    color="primary"
                    checked={
                      selectedIds.length > 0 &&
                      ids.length > 0 &&
                      !ids.find(it => selectedIds.indexOf(it) === -1)
                    }
                    onChange={this.handleSelectAll}
                  />
                </TableCell>
              )}
              {React.Children.map(
                children,
                (field, index) =>
                  field ? (
                    <DatagridHeaderCell
                      className={classes.headerCell}
                      currentSort={currentSort}
                      field={field}
                      isSorting={field.props.source === currentSort.field}
                      key={field.props.source || index}
                      resource={resource}
                      updateSort={this.updateSort}
                    />
                  ) : null,
              )}
            </TableRow>
          </TableHead>
          <DatagridBody
            basePath={basePath}
            classes={classes}
            data={data}
            hasBulkActions={hasBulkActions}
            hover={hover}
            ids={ids}
            isLoading={isLoading}
            onToggleItem={onToggleItem}
            resource={resource}
            rowStyle={rowStyle}
            selectedIds={selectedIds}
            version={version}
            {...bodyProps}
          >
            {children}
          </DatagridBody>
        </Table>
      </Paper>
    );
  }
}

Datagrid.propTypes = {
  basePath: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  className: PropTypes.string,
  currentSort: PropTypes.shape({
    sort: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  data: PropTypes.object.isRequired,
  hasBulkActions: PropTypes.bool.isRequired,
  hover: PropTypes.bool,
  ids: PropTypes.arrayOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool,
  onSelect: PropTypes.func,
  onToggleItem: PropTypes.func,
  resource: PropTypes.string,
  rowStyle: PropTypes.func,
  selectedIds: PropTypes.arrayOf(PropTypes.any), //.isRequired,
  setSort: PropTypes.func,
  total: PropTypes.number,
  version: PropTypes.number,
};

Datagrid.defaultProps = {
  data: {},
  hasBulkActions: false,
  ids: [],
  selectedIds: [],
};

export default withStyles(styles)(Datagrid);
