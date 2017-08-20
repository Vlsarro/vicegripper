import React from 'react';

import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css';


class ResistanceSlider extends React.Component {
    constructor(props) {
        super(props);
        this.onAfterChange = this.onAfterChange.bind(this);
    }

    onAfterChange(value) {
        this.props.onAfterChange(value);
    }

    render() {
        let divWrapperStyle = { margin: '40px 40px 20px 40px' };
        return (
            <div style={divWrapperStyle}>
                <Slider dots step={1} defaultValue={this.props.defaultPosition} max={11}
                        onAfterChange={this.onAfterChange} />
                <p>{this.props.resistance + ' ' + this.props.weightUnit}</p>
            </div>
        );
    }
}

export default ResistanceSlider;
