import React from 'react';
import PropTypes from 'prop-types';

class ScorePreferences extends React.Component {
    constructor(props) {
        super(props);

        // TODO: We could store settings in localStorage and retrieve them on page load
        const defaults = {
            selectNotes: true,
            selectMeasures: false
        };
        // TODO: Ensure that only one item is set to true here
        //       maybe this should be a radio button instead
        this.state = Object.assign(defaults, props.preferences);
        this.toggleNotes = this.toggleNotes.bind(this);
        this.toggleMeasures = this.toggleMeasures.bind(this);
        this.sendSettings = this.sendSettings.bind(this);

        this.sendSettings();
    }

    toggleNotes() {
        const currentNotes = this.state.selectNotes;
        this.setState({
            selectNotes: !currentNotes,
            selectMeasures: currentNotes
        }, () => this.sendSettings());
    }

    toggleMeasures() {
        const currentMeasures = this.state.selectMeasures;
        this.setState({
            selectMeasures: !currentMeasures,
            selectNotes: currentMeasures
        }, () => this.sendSettings());
    }

    sendSettings() {
        this.props.settingsHandler(this.state);
    }

    render() {
        return (
            <div className="">
                <span><b>Selection preferences</b></span><br/>
                <label><input type="checkbox" checked={this.state.selectNotes} onChange={this.toggleNotes} /> Select notes </label><br/>
                <label><input type="checkbox" checked={this.state.selectMeasures} onChange={this.toggleMeasures} /> Select measures </label>
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
