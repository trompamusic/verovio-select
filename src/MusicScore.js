import React from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';

import ScorePreferences from './ScorePreferences';
import ScoreInput from './ScoreInput';

class MusicScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {}
        };

        this.handleSettingsChange = this.handleSettingsChange.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.loadUrl = this.loadUrl.bind(this);
    }

    handleChangeInput(theUrl) {
        // setstate is asynchronous, use a callback
        this.setState({url: theUrl}, () => this.loadUrl(this.state.url));
    }

    handleSettingsChange(settings) {
        // setstate is asynchronous, use a callback
        this.setState({settings: settings}, () => {
            // TODO: Change selectables selector based on settings
        });
    }

    loadUrl(url) {
            $.ajax({
                url: url,
                dataType: "text",
                success: (data) => {
                    var vrvToolkit = new window.verovio.toolkit();
                    var svg = vrvToolkit.renderData(data, {svgViewBox: true});
                    this.setState({svg: svg});
                }
            });
    }

    render() {
        return (
            <div>
                <ScorePreferences preferences={{}} settingsHandler={this.handleSettingsChange}/>
                <ScoreInput handleSubmit={this.handleChangeInput}/>
                <div id="score" dangerouslySetInnerHTML={{__html: this.state.svg}} />
            </div>
        );
    }
}

MusicScore.propTypes = {
    scoreURL: PropTypes.string,
};

export default MusicScore;
