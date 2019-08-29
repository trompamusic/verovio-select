import React from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ScorePreferences from './ScorePreferences';
import ScoreInput from './ScoreInput';

class MusicScore extends React.Component {
    constructor(props) {
        super(props);

        let svg = '';
        let showURLInput = true;
        let scoreURL = '';
        if (typeof props.scoreSVG === "string") {
            svg = props.scoreSVG;
            showURLInput = false;
        } else if (typeof props.scoreURL === "string") {
            scoreURL = props.scoreURL;
            showURLInput = false;
        }

        if (typeof props.showURLInput === "boolean") {
            showURLInput = props.showURLInput;
        }

        this.state = {
            settings: {},
            scoreURL: scoreURL,
            svg: svg,
            showURLInput: showURLInput
        };

        if (scoreURL !== "") {
            this.loadScoreFromUrl(scoreURL);
        }

        this.handleSettingsChange = this.handleSettingsChange.bind(this);
        this.handleScoreURLChange = this.handleScoreURLChange.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.loadScoreFromUrl = this.loadScoreFromUrl.bind(this);
    }

    handleScoreURLChange(theUrl) {
        // setstate is asynchronous, use a callback
        this.setState({url: theUrl}, () => this.loadScoreFromUrl(this.state.url));
    }

    handleSettingsChange(settings) {
        this.setState({settings: settings}, () => {
            // TODO: Change selector based on settings
        });
    }

    handleSelectionChange(selection) {
        this.setState({selection: selection}, () => {
            if (typeof this.props.selectionCallback === "function") {
                this.props.selectionCallback(selection);
            }
        });
    }

    loadScoreFromUrl(url) {
        $.ajax({
            url: url,
            dataType: "text",
            success: (data) => {
                // TODO: Even if this succeeds, we need to verify that it's actual XML/MEI
                //  need to work out how to validate the content or catch error from verovio
                const vrvToolkit = new window.verovio.toolkit();
                const svg = vrvToolkit.renderData(data, {svgViewBox: true});
                this.setState({svg: svg});
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                console.debug(textStatus);
            }
        });
    }

    render() {
        return (
            <div>
                <Container fluid={true}>
                    <Row style={{border:"2px solid red"}}>
                        <Col sm={4} lg={4} style={{border:"2px solid red"}}>
                            {this.state.showURLInput ? <ScoreInput handleSubmit={this.handleScoreURLChange}/> : null }
                            <ScorePreferences preferences={{}} settingsHandler={this.handleSettingsChange}/>
                        </Col>
                        <Col sm={8} lg={8} style={{border:"2px solid blue"}}>
                            <div id="score" dangerouslySetInnerHTML={{__html: this.state.svg}} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

MusicScore.propTypes = {
    scoreURL: PropTypes.string,
    showURLInput: PropTypes.bool,
    scoreSVG: PropTypes.string,
    selectionCallback: PropTypes.func,
    preferencesCallback: PropTypes.func
};

export default MusicScore;
