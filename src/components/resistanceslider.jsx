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
        return (
            <div className="slider-wrapper" key={this.props.sliderKey}>
                <Range dots step={1} max={11} onAfterChange={this.onAfterChange}
                       defaultValue={this.props.defaultValue} count={this.props.springNumber} pushable
                       tipFormatter={value => value + 1}/>
                <p className="res-result">{`Resistance: ${this.props.resistance.toPrecision(3)} ${this.props.weightUnit}, positions: ${this.props.defaultValue.map((x) => {return x + 1})}`}</p>
            </div>
        );
    }
}

export default ResistanceRange;
