import React, { Component } from 'react';
import Button from './Button';
import { connect } from 'react-redux';

const sanitizeRestProps = ({ ...rest }) => rest;

class ImportButton extends Component {
    static propTypes = {};

    handleClick = () => {
        console.log('import click');
    };

    render() {
        const { label, ...rest } = this.props;

        return (
            <Button
                onClick={this.handleClick}
                label={label}
                {...sanitizeRestProps(rest)}
            />
        );
    }
}

ImportButton.defaultProps = {
    label: 'ra.action.import',
}

export default connect()(ImportButton);
