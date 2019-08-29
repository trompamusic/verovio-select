import React from 'react';
import PropTypes from 'prop-types';

class SelectionDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (typeof this.props.data === "undefined") {
            // TODO: return a header even if there's no data?
            return null;
        }
        let elements = [];
        for (let i = 0; i < this.props.data.length; i++) {
            elements.push(this.props.data[i].id);
        }
        return (
            <div>
                <span><b>Selected elements</b></span><br/>
                <ul>
                    {elements.map((value, index) => {
                        return <li key={value}>{value}</li>
                    })}
                </ul>
            </div>
        );
    }

}

SelectionDisplay.propTypes = {
    data: PropTypes.array,
};

export default SelectionDisplay;
