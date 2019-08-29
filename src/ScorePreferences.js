import React from 'react';
import PropTypes from 'prop-types';

class ScorePreferences extends React.Component {
    constructor(props) {
        super(props);

        const defaults = {
            selectNotes: true,
            selectMeasures: false
        };
        this.state = Object.assign(defaults, props.preferences);
        this.toggleNotes = this.toggleNotes.bind(this);
        this.toggleMeasures = this.toggleMeasures.bind(this);
        this.sendSettings = this.sendSettings.bind(this);

        this.sendSettings();
    }

    toggleNotes() {
        this.setState({
            selectNotes: !this.props.selectNotes
        }, () => this.sendSettings());
    }

    toggleMeasures() {
        this.setState({
            selectMeasures: !this.props.selectMeasures
        }, () => this.sendSettings());
    }

    sendSettings() {
        this.props.settingsHandler(this.state);
    }

    render() {
        return (
            <div className="">
                <label><input type="checkbox" onClick={this.toggleNotes} /> Select notes </label><br/>
                <label><input type="checkbox" onClick={this.toggleMeasures} /> Select measures </label>
            </div>
        );
    }
}

ScorePreferences.propTypes = {
    selectNotes: PropTypes.bool,
    selectMeasures: PropTypes.bool,
    settingsHandler: PropTypes.func,
    preferences: PropTypes.object
};

export default ScorePreferences;
