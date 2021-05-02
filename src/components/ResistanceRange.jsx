import React from 'react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const ResistanceRange = ({onAfterChange, sliderKey, resistance, weightUnit, defaultValue, springNumber}) => {
    return (
        <div className="slider-wrapper" key={sliderKey}>
            <Range dots step={1} max={11} onAfterChange={onAfterChange}
                   defaultValue={defaultValue} count={springNumber} pushable
                   tipFormatter={value => value + 1}/>
            <p className="res-result">{`Resistance: ${resistance.toPrecision(3)} ${weightUnit}, positions: ${defaultValue.map((x) => {return x + 1})}`}</p>
        </div>
    )
}

ResistanceRange.propTypes = {
    onAfterChange: PropTypes.func.isRequired,
    sliderKey: PropTypes.string.isRequired,
    resistance: PropTypes.number.isRequired,
    weightUnit: PropTypes.string.isRequired,
    defaultValue: PropTypes.arrayOf(PropTypes.number).isRequired,
    springNumber: PropTypes.number.isRequired
}

export default ResistanceRange;
