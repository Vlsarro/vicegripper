import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


class ResistanceRange extends React.Component {
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
            <div key={this.props.sliderKey} style={divWrapperStyle}>
                <Range dots step={1} max={11} onAfterChange={this.onAfterChange}
                       defaultValue={this.props.defaultValue} count={this.props.springNumber} pushable
                       tipFormatter={value => value + 1}/>
                <p>{`Resistance: ${this.props.resistance.toPrecision(3)} ${this.props.weightUnit},
                positions: ${this.props.defaultValue.map((x) => {return x + 1})}`}</p>
            </div>
        );
    }
}

export default ResistanceRange;
