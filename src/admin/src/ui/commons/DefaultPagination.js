import React from "react";
import PropTypes from "prop-types";

import { translate as translateDeco } from "react-admin";

// import Button from '@material-ui/core/Button';
import Toolbar from "@material-ui/core/Toolbar";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

@translateDeco
export default class DefaultPagination extends React.Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
  };

  onChange = page => {
    this.props.setPage(page);
  };
  render() {
    let { translate, total, perPage, page, ids } = this.props;
    let count_data = 0;
    if (ids && ids.length) {
      count_data = ids.length;
    }
    // do not print pagination if data is empty
    if (!total) {
      return null;
    }

    return (
      <Toolbar style={{ float: "right" }} disableGutters>
        <Pagination
          onChange={this.onChange}
          current={page}
          defaultPageSize={perPage}
          total={total}
          showTotal={(total, range) => {
            if (total) {
              return translate("text.pagination", {
                rangeStart: range[0],
                rangeEnd: range[1],
                perPage: count_data,
                total,
              });
            }

            return translate("text.pagination", {
              rangeStart: range[0],
              rangeEnd: range[1],
              perPage: count_data,
              total,
            });
          }}
        />
      </Toolbar>
    );
  }
}
