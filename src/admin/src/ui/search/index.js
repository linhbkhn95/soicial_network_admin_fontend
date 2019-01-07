import React, { Component } from 'react';
import PropTypes from 'prop-types';
import objectPath from 'object-path';
import { connect } from 'react-redux';
import { CREATE, translate as translateDeco } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import qs from 'qs';
import { push } from 'react-router-redux';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/icons/Search';

import Histories from './Histories';
import SearchResult from './SearchResult';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: '0 -18px',
    boxShadow: '0px 3px 9px 0px #00000014',
  },
  button: {
    background: '#FFBB00',
    color: 'rgba(32, 48, 72, 0.6)',
    padding: '10px 40px',
    margin: 20,
    boxShadow: '0 1px 1px 0 rgba(0,0,0,.2)',
  },
  input: {
    flex: 1,
    padding: 18,
  },
  inputControl: {
    backgroundColor: '#fff',
    border: 'solid 1px #ddd',
    borderRadius: 4,
    marginTop: 0,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

// export const SearchIcon = Icon;
export class SearchIcon extends Component {
  render() {
    return (
      <React.Fragment>
        <svg
          className="menu-icon"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="24.000000pt"
          height="24.000000pt"
          viewBox="0 0 24.000000 24.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <metadata>
            Created by potrace 1.14, written by Peter Selinger 2001-2017
          </metadata>
          <g
            transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              d="M62 180 c-47 -45 -10 -126 53 -117 17 2 40 -2 52 -11 21 -13 23 -13
23 2 0 9 -5 16 -10 16 -6 0 -8 16 -4 40 6 34 3 45 -16 65 -29 30 -69 32 -98 5z
m82 -13 c28 -20 18 -69 -17 -81 -36 -13 -61 2 -65 38 -6 49 40 74 82 43z"
            />
          </g>
        </svg>
      </React.Fragment>
    );
  }
}
class HistoriesPage extends Component {
  state = {
    searchState: 'history',
    keywords: {
      //
    },

    pristine: false,
    submitting: false,
    currentSearch: '',

    filters: {
      vehicle: '',
      driver: '',
      booking: '',
    },
  };

  componentDidMount() {
    // update keyword via location.search
    const { search } = objectPath.get(this.props, 'routing.location');
    const urlParams = qs.parse(
      search.startsWith('?') ? search.substr(1) : search,
    );

    // filters
    const initialValues = objectPath.get(urlParams, 'filters', {});

    this.setState({
      filters: {
        ...this.state.filters,
        ...initialValues,
      },
    });
  }

  submit = e => {
    e.preventDefault();

    this.setState(
      {
        submission: true,
        submitting: true,
      },
      () => {
        this.props.dispatch(
          push({
            pathname: '/search',
            search: qs.stringify({
              filters: this.state.filters,
              submission: true,
            }),
          }),
        );

        (async () => {
          // update keyword
          const values = this.state.filters;
          await Promise.all(
            Object.keys(values)
              .filter(key => !!values[key])
              .map(key =>
                this.props.dataProvider(CREATE, 'search-histories', {
                  data: {
                    keyword: values[key],
                    type: key,
                  },
                }),
              ),
          );

          this.setState({
            submitting: false,
          });
        })();
      },
    );
  };

  renderSearchState() {
    if (
      Object.keys(this.state.filters).every(
        name => this.state.filters[name] === '',
      )
    ) {
      return <Histories dataProvider={this.props.dataProvider} />;
    }

    return (
      <SearchResult
        filters={this.state.filters}
        dataProvider={this.props.dataProvider}
        mode={this.state.submission ? 'submit' : 'suggestion'}
      />
    );
  }

  onFocus = name => () => {
    this.setState({
      currentSearch: name,
    });
  };

  onInputChange = name => event => {
    this.setState({
      filters: {
        ...this.state.filters,
        [name]: event.target.value,
      },
      submission: false,
    });
  };

  get pristine() {
    return !Object.keys(this.state.filters).some(
      item => '' == this.state.filters[item], // eslint-disable-line
    );
  }

  refForm = null;

  render() {
    const { classes, submitting, translate } = this.props;
    const { pristine } = this;
    return (
      <div
        style={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <form className={classes.root} onSubmit={this.submit}>
          <div className={classes.input}>
            <Input
              fullWidth
              disableUnderline
              className={classes.inputControl}
              hintText={translate('resources.search.input.vehicle')}
              placeholder={translate('resources.search.input.vehicle')}
              value={this.state.filters.vehicle}
              onChange={this.onInputChange('vehicle')}
              onFocus={this.onFocus('vehicle')}
            />
          </div>
          <div className={classes.input}>
            <Input
              fullWidth
              disableUnderline
              className={classes.inputControl}
              hintText={translate('resources.search.input.driver')}
              placeholder={translate('resources.search.input.driver')}
              value={this.state.filters.driver}
              onChange={this.onInputChange('driver')}
              onFocus={this.onFocus('driver')}
            />
          </div>
          <div className={classes.input}>
            <Input
              fullWidth
              disableUnderline
              className={classes.inputControl}
              hintText={translate('resources.search.input.booking')}
              placeholder={translate('resources.search.input.booking')}
              value={this.state.filters.booking}
              onChange={this.onInputChange('booking')}
              onFocus={this.onFocus('booking')}
            />
          </div>
          <div>
            <Button
              variant="raised"
              type="submit"
              color="default"
              size="medium"
              disabled={pristine || submitting}
              className={classes.button}
              // onClick={handleSubmit(this.submit)}
            >
              Tìm kiếm
            </Button>
          </div>
        </form>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            overflowY: 'scroll',
            margin: '0 -24px',
            padding: '0 24px',
            paddingRight: '12px',
          }}
        >
          {this.renderSearchState()}
        </div>
      </div>
    );
  }
}

HistoriesPage.propTypes = {
  dataProvider: PropTypes.func,
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

const SearchWithStyle = withStyles(styles)(translateDeco(HistoriesPage));

const SearchWithRedux = connect(state => ({
  routing: state.routing,
}))(SearchWithStyle);

export default SearchWithRedux;
