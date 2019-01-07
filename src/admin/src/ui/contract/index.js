import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import { Grid, Button, Modal } from '@material-ui/core';
import { GET_ONE, translate as translateDeco } from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';

// import HourglassEmpty from '@material-ui/icons/HourglassEmpty';

// export const ContractIcon = HourglassEmpty;

export const ContractIcon = () => (
  <svg
    className="menu-icon"
    width="22"
    height="21"
    viewBox="0 0 22 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.3333 9.33333L7.66667 7.33422L5 9.33422V2.23333H4.99961H2.33294C2.21802 2.23333 2.1078 2.27899 2.02653 2.36025C1.94526 2.44152 1.89961 2.55174 1.89961 2.66667V18.6667C1.89961 18.7816 1.94526 18.8918 2.02653 18.9731C2.1078 19.0543 2.21802 19.1 2.33294 19.1H19.6663C19.7812 19.1 19.8914 19.0543 19.9727 18.9731C20.054 18.8918 20.0996 18.7816 20.0996 18.6667V2.66667C20.0996 2.55174 20.054 2.44152 19.9727 2.36025C19.8914 2.27899 19.7812 2.23333 19.6663 2.23333H10.3333V9.33333ZM5.05049 0.41216C5.04746 0.419496 5.04457 0.426879 5.0418 0.434306C5.02782 0.433661 5.01375 0.433334 4.99961 0.433334H2.33294C1.74063 0.433334 1.17257 0.668631 0.753738 1.08746C0.334906 1.50629 0.0996094 2.07435 0.0996094 2.66667V18.6667C0.0996094 19.259 0.334907 19.827 0.753738 20.2459C1.17257 20.6647 1.74062 20.9 2.33294 20.9H19.6663C20.2586 20.9 20.8267 20.6647 21.2455 20.2459C21.6643 19.827 21.8996 19.259 21.8996 18.6667V2.66667C21.8996 2.07435 21.6643 1.50629 21.2455 1.08746C20.8266 0.668631 20.2586 0.433334 19.6663 0.433334H10.3329C10.3191 0.433334 10.3052 0.433651 10.2915 0.434273C10.2584 0.345347 10.2065 0.263642 10.1381 0.195262C10.013 0.0702379 9.84348 0 9.66667 0H5.66667C5.57904 0 5.49228 0.0172731 5.41134 0.0508318C5.3304 0.0843906 5.25687 0.133576 5.19495 0.195576C5.13303 0.257576 5.08394 0.331174 5.05049 0.41216ZM5 15.25C4.58579 15.25 4.25 15.5858 4.25 16C4.25 16.4142 4.58579 16.75 5 16.75H14.3333C14.7475 16.75 15.0833 16.4142 15.0833 16C15.0833 15.5858 14.7475 15.25 14.3333 15.25H5ZM4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H17C17.4142 11.25 17.75 11.5858 17.75 12C17.75 12.4142 17.4142 12.75 17 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12ZM13 7.25C12.5858 7.25 12.25 7.58579 12.25 8C12.25 8.41421 12.5858 8.75 13 8.75H17C17.4142 8.75 17.75 8.41421 17.75 8C17.75 7.58579 17.4142 7.25 17 7.25H13Z"
      fill="#203048"
      fill-opacity="0.6"
    />
  </svg>
);

const styles = theme => ({
  contractImage: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    display: 'block',
  },
  contractItem: {
    padding: 0,
  },
  modalBox: {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    maxWidth: 600,
    backgroundColor: '#fff',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  imageFull: {
    width: 'auto',
    maxWidth: '100%',
  },
});

@translateDeco
@connect(state => ({ identity: state.auth.identity }))
@withStyles(styles)

export default class Contract extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    translate: PropTypes.func,
    dataProvider: PropTypes.func,
  }

  state = {
    loading: true,
    modalData: null,
    currentIndex: 0,
    data: {
      image_urls: [],
      pdf_file: '',
    },
  };

  async componentDidMount() {
    const contract = await this.props.dataProvider(GET_ONE, 'contracts', {
      id: 'current',
    });

    if (contract) {
      this.setState({
        loading: false,
        data: contract.data,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  renderContractPages() {
    const { translate } = this.props;

    if (!this.state.data) {
      return <div>No contract pages</div>;
    }

    if (!this.state.data.image_urls) {
      return <div>No contract pages</div>;
    }

    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={8}>
          {this.state.data.image_urls.map((item, index) => (
            <Grid key={index} item sm={6} md={3}>
              <Button
                className={classes.contractItem}
                onClick={this.handleOpen(item, index)}
              >
                <img alt={item} src={item} className={classes.contractImage} />
              </Button>
            </Grid>
          ))}
        </Grid>

        <br />

        <Button
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 48,
            paddingRight: 48,
          }}
          variant="raised"
          color="primary"
          onClick={this.downloadPdf}
        >
          {translate('resources.contract.btnDownloadPdfTitle')}
        </Button>
      </React.Fragment>
    );
  }

  downloadPdf = () => {
    // https://stackoverflow.com/questions/43432892/force-download-get-request-using-axios
    window.open(this.state.data.pdf_file_url, '_blank');
  };

  handleClose = () => {
    this.setState({
      modalData: null,
    });
  };

  handleOpen = (item, index) => () => {
    this.setState({
      modalData: item,
      currentIndex: index,
    });
  };

  viewNext = () => {
    const { currentIndex, data } = this.state;
    if (currentIndex < data.image_urls.length - 1) {
      this.setState({
        currentIndex: currentIndex + 1,
        modalData: data.image_urls[currentIndex + 1],
      });
    }
  };

  viewPrev = () => {
    const { currentIndex, data } = this.state;
    if (currentIndex > 0) {
      this.setState({
        currentIndex: currentIndex - 1,
        modalData: data.image_urls[currentIndex - 1],
      });
    }
  };

  render() {
    const { translate, classes } = this.props;
    // const { data } = this.state;

    return (
      <div>
        <div className="fontstyle-h2">
          <span>{translate('resources.contract.pageTitle')}</span>
          <div
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: 'rgba(32, 48, 72, 0.6)',
              fontFamily: 'IBM Plex Sans',
            }}
          >
            {translate('resources.contract.pageSubtitle')}
          </div>
        </div>

        <br />

        {this.state.loading ? <CircularProgress /> : this.renderContractPages()}

        <Modal open={this.state.modalData !== null} onClose={this.handleClose}>
          {this.state.modalData ? (
            <div className={classes.modalBox}>
              {this.state.currentIndex > 0 ? (
                <div
                  onClick={this.viewPrev}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    padding: '40px 20px',
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'Times',
                    lineHeight: '40px',
                    fontSize: '36px',
                    marginTop: '-20px',
                    cursor: 'pointer',
                  }}
                >
                  ‹
                </div>
              ) : null}

              <img
                alt={this.state.modalData}
                src={this.state.modalData}
                className={classes.imageFull}
              />

              {this.state.currentIndex <
              this.state.data.image_urls.length - 1 ? (
                <div
                  onClick={this.viewNext}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                  
                    padding: '40px 20px',
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'Times',
                    lineHeight: '40px',
                    fontSize: '36px',
                    marginTop: '-20px',
                    cursor: 'pointer',
                  }}
                >
                  ›
                </div>
              ) : null}
            </div>
          ) : null}
        </Modal>
      </div>
    );
  }
}