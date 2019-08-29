import React from 'react';
import PropTypes from 'prop-types';

class ScoreInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '/Beethoven_WoO80-32-Variationen-c-Moll.mei'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange} /> URL
                <input type="submit" value="Load" />
            </form>
        );
    }

}

ScoreInput.propTypes = {
    value: PropTypes.string,
    handleSubmit: PropTypes.func
};

export default ScoreInput;
