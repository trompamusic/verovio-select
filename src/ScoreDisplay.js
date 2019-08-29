import React from 'react';
import PropTypes from 'prop-types';

class ScoreDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        // TODO: every time you change props, it will re-render.this means that
        //   we'll re-make svg each time, which will be slow. Either move the rendering
        //   up a level and pass it in as a prop, or use
        //   getDerivedStateFromProps - https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
        //   https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
        // TODO: same issue when changing settings. If we re-render the svg, the current selection
        //   will be lost. Need to work out if this is a problem or not.
        //enable_selectables();
        return (
            <div dangerouslySetInnerHTML={{__html: this.props.data}}></div>
        );
    }
}

ScoreDisplay.propTypes = {
    data: PropTypes.string,
    settings: PropTypes.object
};

export default ScoreDisplay;
