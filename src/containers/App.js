import React, { Component } from 'react';

import Button from '../components/Button.jsx';
import GripToggle from '../components/GripToggle.jsx';
import ResistanceRange from '../components/ResistanceRange.jsx';
import ResistanceInput from '../components/ResistanceInput.jsx';
import SpringNumberSelect from "../components/SpringNumberSelect.jsx";

import {
    validateResistanceInput, lowerLimit, upperLimit, lbToKg, kgToLb, calculateResistance, calculateSliderPositions,
    innerGripResistanceValues
} from '../utils';

import './App.css';

const INNER = false;
const POUND = 'lb'
const KILOGRAM = 'kg'


class App extends Component {

    constructor(props) {
        super(props);

        this.onSpringNumberChange = this.onSpringNumberChange.bind(this);
        this.onGripChange = this.onGripChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);
        this.updateResistance = this.updateResistance.bind(this);
        this.onResistanceInputChange = this.onResistanceInputChange.bind(this);
        this.onResistanceBtnClick = this.onResistanceBtnClick.bind(this);

        const initialSliderPosition = [1];
        const initialSpringNumber = '1';

        this.state = {
            weightUnit: POUND,
            grip: INNER,
            springNumber: initialSpringNumber,
            resistance: innerGripResistanceValues[initialSliderPosition],
            sliderPosition: initialSliderPosition,
            sliderKey: 'one-spring',
            resistanceInputVal: '0',
            resistanceInputClass: 'valid',
            btnDisabled: true,
            resistanceInputInvalidMsg: ''
        };
    }

    updateResistance(newPosition) {
        let stateObject, value;
        if (newPosition !== undefined) {
            value = calculateResistance(newPosition, this.state.grip === INNER)
            stateObject = {
                sliderPosition: newPosition,
                resistance: this.state.weightUnit === KILOGRAM ? lbToKg(value) : value
            };
        } else {
            value = calculateResistance(this.state.sliderPosition, this.state.grip === INNER)
            stateObject = {resistance: this.state.weightUnit === KILOGRAM ? lbToKg(value) : value};
        }
        this.setState(stateObject);
    }

    onSpringNumberChange(newSpringNumber) {
        let sliderPos = [],
            sliderKey;
        switch (newSpringNumber) {
            case '1':
                sliderPos = [this.state.sliderPosition[0]];
                sliderKey = 'one-spring';
                break;
            case '2':
                if (this.state.sliderPosition.length === 1) {
                    sliderPos = this.state.sliderPosition.slice(0);
                    sliderPos.push(2);
                } else if (this.state.sliderPosition.length === 3) {
                    sliderPos = this.state.sliderPosition.slice(0, 2);
                }
                sliderKey = 'two-spring';
                break;
            case '3':
                if (this.state.sliderPosition.length === 1) {
                    sliderPos = this.state.sliderPosition.slice(0);
                    sliderPos.push(2, 3);
                } else if (this.state.sliderPosition.length === 2) {
                    sliderPos = this.state.sliderPosition.slice(0);
                    sliderPos.push(3);
                }
                sliderKey = 'three-spring';
                break;
            default:
                console.error('Invalid number of springs: ' + newSpringNumber);
                break;
        }
        this.setState({
            springNumber: newSpringNumber,
            sliderPosition: sliderPos.sort(),
            sliderKey: sliderKey
        }, this.updateResistance);
    }

    onGripChange(grip) {
        this.setState({grip: grip}, this.updateResistance);
    }

    onButtonClick(newWeightUnit) {
        this.setState({weightUnit: newWeightUnit}, this.updateResistance);
    }

    onAfterChange(newPosition) {
        this.updateResistance(newPosition);
    }

    onResistanceBtnClick() {
        let result,
            resistance = parseFloat(this.state.resistanceInputVal);

        if (this.state.weightUnit === KILOGRAM) {
            resistance = kgToLb(resistance);
        }

        try {
            result = calculateSliderPositions(this.state.springNumber, this.state.grip === INNER, resistance);
        } catch (err) {
            console.error(err);
            this.setState({
                resistanceInputClass: 'invalid',
                resistanceInputInvalidMsg: 'Suitable positions not found'
            });
            return;
        }

        this.setState((prevState) => {
            return {
                sliderPosition: result,
                sliderKey: prevState.sliderKey + '_'  // change key for slider rerendering
            };
        }, this.updateResistance(result));
    }

    onResistanceInputChange(value) {
        let inputClass = validateResistanceInput(value);
        let btnDisabled = inputClass === 'invalid';
        this.setState({
            resistanceInputVal: value,
            btnDisabled: btnDisabled,
            resistanceInputClass: inputClass,
            resistanceInputInvalidMsg: `The value should be between ${lowerLimit} and ${upperLimit}
                                        ${this.state.weightUnit}`
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>VICE GRIPPER</h2>
                </div>
                <div className="main-content">
                    <SpringNumberSelect springNumber={this.state.springNumber} onChange={this.onSpringNumberChange} />
                    <GripToggle onChange={this.onGripChange} />
                    <ResistanceRange resistance={this.state.resistance} defaultValue={this.state.sliderPosition}
                                     weightUnit={this.state.weightUnit} onAfterChange={this.onAfterChange}
                                     springNumber={parseInt(this.state.springNumber, 10)}
                                     sliderKey={this.state.sliderKey} />
                    <ResistanceInput inputClass={this.state.resistanceInputClass}
                                     onButtonClick={this.onResistanceBtnClick} disabled={this.state.btnDisabled}
                                     onChange={this.onResistanceInputChange} weightUnit={this.state.weightUnit}
                                     invalidMsg={this.state.resistanceInputInvalidMsg} />
                    <div className="weight-btns-wrapper">
                        <Button name={KILOGRAM} onClick={this.onButtonClick} />
                        <Button name={POUND} onClick={this.onButtonClick} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
