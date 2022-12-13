import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

type ResistanceRangeProps = {
    sliderKey: string,
    resistance: number,
    weightUnit: string,
    value: number[],
    springNumber: number,
    onChange(newPosition: number[]): void
}

const ResistanceRange = ({sliderKey, resistance, weightUnit, value, springNumber, onChange}: ResistanceRangeProps): JSX.Element => {
    return (
        <div 
            className="slider-wrapper" 
            key={sliderKey}
        >
            <Range
                onChange={onChange}
                dots
                step={1} 
                max={11}
                value={value} 
                count={springNumber} 
                pushable
                tipFormatter={value => value + 1}
            />
            <p className="res-result">
                {`Resistance: ${resistance.toPrecision(3)} ${weightUnit}, positions: ${value.map((x) => {return x + 1})}`}
            </p>
        </div>
    )
}

export default ResistanceRange;
