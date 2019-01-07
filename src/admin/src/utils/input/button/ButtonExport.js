import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CRUD_GET_MANY, GET_MANY } from 'react-admin';
import { stringify } from 'qs';
import { API_BASE } from '~/dataProvider/constants';
import { Button } from 'react-admin';
import compose from 'recompose/compose';
import { translate } from 'ra-core';

const sanitizeRestProps = ({
  basePath,
  // crudGetAll,
  dispatch,
  exporter,
  filter,
  maxResults,
  resource,
  sort,
  ...rest
}) => rest;

/**
 * Helper function for calling the data provider with GET_MANY
 * via redux and saga, and getting a Promise in return
 *
 * @example
 *     fetchRelatedRecords(records, 'post_id', 'posts').then(posts =>
 *          posts.map(record => ({
 *              ...record,
 *              post_title: posts[record.post_id].title,
 *          }));
 */
const fetchRelatedRecords = dispatch => (data, field, resource) =>
  new Promise((resolve, reject) => {
    // find unique keys
    const ids = [...new Set(data.map(record => record[field]))];

    dispatch({
      type: CRUD_GET_MANY,
      payload: { ids },
      meta: {
        resource,
        fetch: GET_MANY,
        onSuccess: {
          callback: ({ payload: { data } }) => {
            resolve(
              data.reduce((acc, post) => {
                acc[post.id] = post;
                return acc;
              }, {}),
            );
          },
        },
        onFailure: {
          notification: {
            body: 'ra.notification.http_error',
            level: 'warning',
          },
          callback: ({ error }) => reject(error),
        },
      },
    });
  });

class ExportButton extends Component {
  static propTypes = {
    basePath: PropTypes.string,
    dispatch: PropTypes.func,
    exporter: PropTypes.func,
    filter: PropTypes.object,
    label: PropTypes.string,
    maxResults: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    sort: PropTypes.object,
  };

  // handleClick = () => {
  //   const {
  //     dispatch,
  //     exporter,
  //     filter,
  //     maxResults,
  //     sort,
  //     resource,
  //   } = this.props;
  //   let url = resource + "/export";
  //   dispatch(
  //     crudGetAll(
  //       url,
  //       sort,
  //       filter,
  //       maxResults,
  //       (
  //         { payload: { data } }, //{
  //       ) => console.log("export success"),
  //       // // }
  //       //   exporter
  //       //     ? exporter(data, fetchRelatedRecords(dispatch), dispatch)
  //       //     : downloadCSV(convertToCSV(data), resource),
  //     ),
  //   );
  // };

  handleClick = async () => {
    const link = await this.getUrlExportData();
    window.open(link, { name: '_blank' });
  };

  async getUrlExportData() {
    const {
      // dispatch,
      // exporter,
      filter,
      // maxResults,
      sort,
      resource,
      dataProvider,
    } = this.props;
    const { accessToken } = await dataProvider('GET__EXPORT');

    // const { page, perPage } = params.pagination;
    const { field, order } = sort;
    const query = {
      access_token: accessToken,
      sorts: JSON.stringify([field, order]),
      filters: JSON.stringify({
        filter,
        // [params.target]: params.id,
      }),
    };
    let url = resource + '/export';
    return `${API_BASE}/${url}?${stringify(query)}`;
  }
  render() {
    const { label, translate, ...rest } = this.props;

    return (
      <Button
        onClick={this.handleClick}
        label={label && translate(label)}
        {...sanitizeRestProps(rest)}
      />
    );
  }
}

ExportButton.defaultProps = {
  label: 'ra.action.export',
  maxResults: 1000,
};
const enhance = compose(
  translate,
  connect(),
);
export default enhance(ExportButton); // inject redux dispatch
