import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pure from 'recompose/pure';
import Typography from '@material-ui/core/Typography';
import sanitizeRestProps from './sanitizeRestProps';

const hasNumberFormat = !!(
  typeof Intl === 'object' &&
  Intl &&
  typeof Intl.NumberFormat === 'function'
);

/**
 * Display a numeric value as a locale string.
 *
 * Uses Intl.NumberFormat() if available, passing the locales and options props as arguments.
 * If Intl is not available, it outputs number as is (and ignores the locales and options props).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
 * @example
 * <NumberField source="score" />
 * // renders the record { id: 1234, score: 567 } as
 * <span>567</span>
 *
 * <NumberField source="score" className="red" />
 * // renders the record { id: 1234, score: 567 } as
 * <span class="red">567</span>
 *
 * <NumberField source="share" options={{ style: 'percent' }} />
 * // renders the record { id: 1234, share: 0.2545 } as
 * <span>25%</span>
 *
 * <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>$25.99</span>
 *
 * <NumberField source="price" locales="fr-FR" options={{ style: 'currency', currency: 'USD' }} />
 * // renders the record { id: 1234, price: 25.99 } as
 * <span>25,99 $US</span>
 */
export const NumberField = ({
  className,
  record,
  source,
  locales,
  options,
  // textAlign,
  ...rest
}) => {
  if (!record) return null;
  const value = get(record, source);
  if (value == null) return null;
  if (!hasNumberFormat) {
    return (
      <Typography
        component="span"
        body1="body1"
        className={className}
        {...sanitizeRestProps(rest)}
      >
        {value}
      </Typography>
    );
  }

  return (
    <Typography
      component="span"
      body1="body1"
      className={className}
      {...sanitizeRestProps(rest)}
    >
      {Number(value).toLocaleString(locales, options)}
    </Typography>
  );
};

NumberField.propTypes = {
  addLabel: PropTypes.bool,
  basePath: PropTypes.string,
  classes: PropTypes.object,
  className: PropTypes.string,
  cellClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  label: PropTypes.string,
  locales: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  options: PropTypes.object,
  record: PropTypes.object,
  textAlign: PropTypes.string,
  sortBy: PropTypes.string,
  source: PropTypes.string.isRequired,
};

const ComposedNumberField = pure(NumberField);

ComposedNumberField.defaultProps = {
  addLabel: true,
  textAlign: 'right',
};
export default ComposedNumberField;
