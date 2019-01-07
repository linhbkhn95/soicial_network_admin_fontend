import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-admin';

const classes = {
  small: 'fontstyle-h4',
  medium: 'fontstyle-h3',
  large: 'fontstyle-h2',
};

const Title = ({ size = 'small', title, translate, hasTranslate }) => {
  const fontClass = classes[size] || classes['small'];
  const renderedTitle = hasTranslate ? translate(title) : title;
  return (
    <div className={fontClass} style={{ marginBottom: 24 }}>
      {renderedTitle}
    </div>
  );
};

Title.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  translate: PropTypes.func,
  hasTranslate: PropTypes.bool,
};

export default translate(Title);
