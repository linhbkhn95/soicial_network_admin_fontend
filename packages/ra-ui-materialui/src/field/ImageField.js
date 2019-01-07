import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import sanitizeRestProps from './sanitizeRestProps';

const styles = {
  list: {
    display: 'flex',
    listStyleType: 'none',
  },
  image: {
    margin: '0.5rem',
  },
};

export const ImageField = ({
  className,
  imgClassName = '',
  classes = {},
  record,
  source,
  src,
  title,
  refForWidth,
  ...rest
}) => {
  const sourceValue = get(record, source);
  if (!sourceValue) {
    return <div className={className} {...sanitizeRestProps(rest)} />;
  }

  if (Array.isArray(sourceValue)) {
    return (
      <ul
        className={classnames(classes.list, className)}
        {...sanitizeRestProps(rest)}
      >
        {sourceValue.map((file, index) => {
          const titleValue = get(file, title) || title;
          const srcValue = get(file, src) || title;

          return (
            <li key={index}>
              <img
                alt={titleValue}
                title={titleValue}
                src={srcValue}
                className={classes.image}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  const titleValue = get(record, title) || title;

  return (
    <div ref={refForWidth} className={className} {...sanitizeRestProps(rest)}>
      <img
        title={titleValue}
        alt={titleValue}
        src={sourceValue}
        className={`${classes.image} ${imgClassName}`}
      />
    </div>
  );
};

ImageField.propTypes = {
  imgClassName: PropTypes.string,
  refForWidth: PropTypes.any,
  addLabel: PropTypes.bool,
  basePath: PropTypes.string,
  className: PropTypes.string,
  cellClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  classes: PropTypes.object,
  record: PropTypes.object,
  sortBy: PropTypes.string,
  source: PropTypes.string.isRequired,
  src: PropTypes.string,
  title: PropTypes.string,
};

export default withStyles(styles)(ImageField);
