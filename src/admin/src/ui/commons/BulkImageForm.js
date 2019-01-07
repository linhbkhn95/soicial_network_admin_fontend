import React, { Component } from 'react';
import { ImageInput, ImageField, translate } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  imageBox: {
    paddingRight: 8,
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  fileInputPreview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    fontSize: 14,
  },
  labelHeader: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '24px',
    color: '#000000',
    fontFamily: "'IBM Plex Sans'",
  },
  imageFieldImg: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
  imageField: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  imageInput: {},
  label: {
    color: 'rgba(32, 48, 72, 0.4)',
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '20px',
    alignItems: 'center',
    fontFamily: 'IBM Plex Sans',
  },
};

@withStyles(styles)
@translate
export default class BulkImageForm extends Component {
  state = {
    dropZoneHeight: 0,
  }

  refForWidth = React.createRef();

  componentDidMount() {
    this.setState({
      dropZoneHeight: this.refForWidth.current.clientWidth,
    });
  }

  render() {
    const {
      label,
      pictures = {},
      translate,
      classes,
      keyAsId,
      record,
    } = this.props;
    return (
      <div className={classes.root} id={keyAsId}>
        <h5>{translate(label)}</h5>
        <Grid container>
          {pictures.map(({ source, label }, idx) => (
            <Grid
              item
              md={3}
              lg={3}
              xs={6}
              className={classes.imageBox}
              key={`${keyAsId}-${source}`}
            >
              <ImageInput
                record={record}
                source={source}
                label={label}
                className={classes.imageInput}
                accept="image/*"
                placeholderClass={classes.placeholder}
                labelHeaderClass={classes.labelHeader}
                previewClassname={classes.preview}
                fileInputPreviewClassname={classes.fileInputPreview}
                width={this.state.dropZoneHeight}
                refForWidth={idx === 0 ? this.refForWidth : null}
                classes={{
                  dropZone: 'dropzoneImage',
                }}
                // label={
                //   <div className={classes.label}>
                //      Nhấn để  tải ảnh
                //   </div>
                // }
                labelSingle={
                  <div className={classes.label}>
                    {translate('label.upload.image.avatar')}
                  </div>
                }
              >
                <ImageField
                  source="src"
                  title="title"
                  imgClassName={classes.imageFieldImg}
                  className={classes.imageField}
                />
              </ImageInput>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
