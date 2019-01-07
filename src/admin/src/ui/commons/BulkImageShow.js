import React, { Component } from 'react';
import { ImageField } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
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
  },
  imageFieldImg: {
    width: '100%',
    margin: 0,
  },
  imageField: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    border: '2px dashed #D2D6DA',
  },
  imageInput: {},
};

@withStyles(styles)
export default class BulkImageShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropZoneHeight: 0,
    };
    this.refForWidth = React.createRef();
  }

  componentDidMount() {
    this.setState({
      dropZoneHeight:
        (this.refForWidth.current && this.refForWidth.current.clientWidth) ||
        200,
    });
  }

  render() {
    const { pictureSrcs = {}, classes, record } = this.props;
    const firstImg = pictureSrcs[0];
    let imgWrapHeight = this.state.dropZoneHeight;
    if (!get(record, firstImg.source)) {
      imgWrapHeight = this.state.dropZoneHeight * 0.5;
    }
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container>
            {pictureSrcs.map(({ source, label }, idx) => (
              <Grid
                item
                md={3}
                lg={3}
                className={classes.imageBox}
                key={`image-show-${source}`}
              >
                <ImageField
                  source={source}
                  title="title"
                  record={record}
                  imgClassName={classes.imageFieldImg}
                  className={classes.imageField}
                  refForWidth={idx === 0 ? this.refForWidth : null}
                  style={{
                    height: imgWrapHeight,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}