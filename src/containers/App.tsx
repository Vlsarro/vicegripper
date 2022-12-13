import { useState } from 'react';

import Button from '../components/Button';
import GripToggle from '../components/GripToggle';
import ResistanceRange from '../components/ResistanceRange';
import ResistanceInput from '../components/ResistanceInput';
import SpringNumberSelect from "../components/SpringNumberSelect";

import {
    validateResistanceInput, lowerLimit, upperLimit, lbToKg, kgToLb, calculateResistance, calculateSliderPositions,
} from '../utils';

import './App.css';

const INNER = false;
const POUND = 'lb'
const KILOGRAM = 'kg'

const App = (): JSX.Element => {
    const [weightUnit, setWeightUnit] = useState<string>(POUND);
    const [grip, setGrip] = useState<boolean>(INNER);
    const [springNumber, setSpringNumber] = useState<number>(1);
    const [sliderPosition, setSliderPosition] = useState<number[]>([1]);
    const [sliderKey, setSliderKey] = useState<string>('one-spring');
    const [resistanceInputVal, setResistanceInputVal] = useState<string>('0');
    const [resistanceInputClass, setResistanceInputClass] = useState<string>('valid');
    const [resistanceInputInvalidMsg, setResistanceInputInvalidMsg] = useState<string>('');
    const [calculateResistanceBtnDisabled, setCalculateResistanceBtnDisabled] = useState<boolean>(true);

    const handleSpringNumberChange = (newSpringNumber: number) => {
        let sliderPos: number[] = [],
            newSliderKey: string = sliderKey;
        switch (newSpringNumber) {
            case 1:
                sliderPos = [sliderPosition[0]];
                newSliderKey = 'one-spring';
                break;
            case 2:
                if (sliderPosition.length === 1) {
                    sliderPos = sliderPosition.slice(0);
                    sliderPos.push(2);
                } else if (sliderPosition.length === 3) {
                    sliderPos = sliderPosition.slice(0, 2);
                }
                newSliderKey = 'two-spring';
                break;
            case 3:
                if (sliderPosition.length === 1) {
                    sliderPos = sliderPosition.slice(0);
                    sliderPos.push(2, 3);
                } else if (sliderPosition.length === 2) {
                    sliderPos = sliderPosition.slice(0);
                    sliderPos.push(3);
                }
                newSliderKey = 'three-spring';
                break;
            default:
                console.error('Invalid number of springs: ' + newSpringNumber);
                break;
        }
        setSpringNumber(newSpringNumber);
        setSliderPosition(sliderPos.sort());
        setSliderKey(newSliderKey);
    }

    const handleGripChange = (grip: boolean) => {
        setGrip(grip)
    }

    const handleCalculateResistanceBtnClick = () => {
        let newSliderPosition: number[] | undefined,
            resistance = parseFloat(resistanceInputVal);

        if (weightUnit === KILOGRAM) {
            resistance = kgToLb(resistance);
        }

        try {
            newSliderPosition = calculateSliderPositions(springNumber, grip === INNER, resistance);
        } catch (err) {
            console.error(err);
            setResistanceInputClass('invalid');
            setResistanceInputInvalidMsg('Suitable positions not found');
            return;
        }
        
        if (newSliderPosition) {
            setSliderPosition(newSliderPosition);
        }
    }

    const handleWeightUnitBtnClick = (unit: string) => {
        setWeightUnit(unit);
    }

    const handleResistanceInputChange = (value: string) => {
        setResistanceInputVal(value);
        let inputClass = validateResistanceInput(value);
        setCalculateResistanceBtnDisabled(inputClass === 'invalid');
        setResistanceInputClass(inputClass);
        setResistanceInputInvalidMsg(`The value should be between ${lowerLimit} and ${upperLimit} ${weightUnit}`);
    }

    const getResistanceValue = () => {
        let value = calculateResistance(sliderPosition, grip === INNER);
        return weightUnit === KILOGRAM ? lbToKg(value) : value
    }

    const handleResistanceRangeChange = (newPosition: number[]) => {
        setSliderPosition(newPosition);
    }
 
    return (
        <div className="App">
            <div className="App-header">
                <h2>VICE GRIPPER</h2>
            </div>
            <div className="main-content">
                <SpringNumberSelect
                    springNumber={springNumber}
                    onChange={handleSpringNumberChange} 
                />
                <GripToggle onChange={handleGripChange} />
                <ResistanceRange
                    onChange={handleResistanceRangeChange}
                    resistance={getResistanceValue()} 
                    value={sliderPosition}
                    weightUnit={weightUnit} 
                    springNumber={springNumber}
                    sliderKey={sliderKey} 
                />
                <ResistanceInput 
                    inputClass={resistanceInputClass}
                    onButtonClick={handleCalculateResistanceBtnClick} 
                    disabled={calculateResistanceBtnDisabled}
                    onChange={handleResistanceInputChange} 
                    weightUnit={weightUnit}
                    invalidMsg={resistanceInputInvalidMsg} />
                <div className="weight-btns-wrapper">
                    <Button 
                        name={KILOGRAM} 
                        onClick={handleWeightUnitBtnClick} 
                    />
                    <Button 
                        name={POUND} 
                        onClick={handleWeightUnitBtnClick} 
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
