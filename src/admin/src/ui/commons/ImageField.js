import React from 'react';
import { ImageField } from 'react-admin';
import Spin from '@material-ui/core/CircularProgress';

export default class ImageFieldFixExif extends React.Component {
  state = {
    fixing: true,
    source: null,
    record: null,
    needUpdate: false,
  };

  static getDerivedStateFromProps(props, state) {
    const newSourceField = props.source;
    const oldSourceField = state.source;

    if (newSourceField !== oldSourceField) {
      return {
        source: newSourceField,
        record: props.record,
        needUpdate: true,
      };
    }

    const oldSourceValue = state.record[props.source];
    const newSourceValue = props.record[props.source];

    if (oldSourceValue !== newSourceValue) {
      return {
        source: newSourceField,
        record: props.record,
        needUpdate: true,
      };
    }

    return null;
  }

  imageRemoveRotate = null;

  fixExif() {
    const { record } = this.state;
    if (record.rawFile) {
      if (this.state.needUpdate) {
        this.setState(
          {
            needUpdate: false,
            fixing: true,
          },
          () => {
            window.loadImage(record.rawFile, img => {
              const updateImage = dataUrl => {
                this.imageRemoveRotate = dataUrl;
                this.setState({
                  fixing: false,
                  needUpdate: false,
                });
              };

              window.EXIF.getData(record.rawFile, function() {
                const orientation = window.EXIF.getTag(this, 'Orientation');
                const canvas = window.loadImage.scale(img, {
                  orientation: orientation || 0,
                  canvas: true,
                });

                updateImage(canvas.toDataURL());
              });
            });
          },
        );
      }
    } else {
      // ignore if preview file
      this.state.fixing = false; // eslint-disable-line
    }
  }

  componentDidUpdate() {
    this.fixExif();
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.state = {
      ...this.state,
      ...ImageFieldFixExif.getDerivedStateFromProps(this.props, this.state),
    };

    this.fixExif();
  }

  render() {
    if (this.state.fixing) {
      return <Spin />;
    }

    const customProps = {
      record: {
        ...this.state.record,
        [this.state.source]: this.imageRemoveRotate
          ? this.imageRemoveRotate
          : this.state.record[this.state.source],
      },
    };

    return <ImageField {...this.props} {...customProps} />;
  }
}
