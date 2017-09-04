import React, { Component } from 'react';

import Button from './../components/button.jsx'
import GripToggle from './../components/griptoggle.jsx'
import ResistanceRange from './../components/resistanceslider.jsx'

import './App.css';

import uniqueId from 'lodash/uniqueId';


const resistanceInnerValues = [13.715, 21.625, 31.285, 42.695, 55.865, 70.785,
                               87.455, 105.885, 126.056, 147.995, 171.685, 197.125],
    resistanceOuterValues = [9.6005, 15.1375, 21.8995, 29.8865, 39.1055, 49.5495,
                             61.2185, 74.1195, 88.2455, 103.5965, 120.1795, 137.9875];

const INNER = false;


function lbToKg (lb) {
    return lb/2.2046;
}


function calculateResistance(positions, resistanceValues) {
    return positions.map((x) => {
        return resistanceValues[x];
    }).reduce((a, b) => {
        return a + b;
    });
}


class SpringNumberSelect extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const id = uniqueId("prefix-");
        this.setState({id: id});
    }

    onChange(e) {
        this.props.onSpringNumberChange(e.target.value);
    }

    render() {
        const labelStyle = {
            padding: '5px',
            verticalAlign: 'middle',
            fontWeight: 'normal',
            marginBottom: '0'
        };

        return (
            <div className="spring-select-wrapper">
                <label style={labelStyle} htmlFor={this.id}>Number of springs</label>
                <select id={this.id} onChange={this.onChange} value={this.props.springNumber}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        );
    }
}

class App extends Component {

    constructor(props) {
        super(props);

        this.onSpringNumberChange = this.onSpringNumberChange.bind(this);
        this.onGripChange = this.onGripChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);
        this.updateResistance = this.updateResistance.bind(this);

        const initialSliderPosition = [1];
        const initialSpringNumber = '1';

        this.state = {
            weightUnit: 'lbs',
            grip: INNER,
            springNumber: initialSpringNumber,
            resistance: resistanceInnerValues[initialSliderPosition],
            sliderPosition: initialSliderPosition,
            sliderKey: 'one-spring'
        };
    }

    updateResistance(newPosition) {
        let stateObject, value;
        if (newPosition !== undefined) {
            value = this.state.grip === INNER ?
                calculateResistance(newPosition, resistanceInnerValues) :
                calculateResistance(newPosition, resistanceOuterValues);
            stateObject = {
                sliderPosition: newPosition,
                resistance: this.state.weightUnit === 'kg' ? lbToKg(value) : value
            };
        } else {
            value = this.state.grip === INNER ?
                calculateResistance(this.state.sliderPosition, resistanceInnerValues) :
                calculateResistance(this.state.sliderPosition, resistanceOuterValues);
            stateObject = {resistance: this.state.weightUnit === 'kg' ? lbToKg(value) : value};
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

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>VICE GRIPPER</h2>
                </div>
                <div className="main-content">
                    <SpringNumberSelect initialValue={this.state.springNumber}
                                        onSpringNumberChange={this.onSpringNumberChange}  />
                    <GripToggle initialGrip={this.state.grip} onGripChange={this.onGripChange} />
                    <ResistanceRange resistance={this.state.resistance} defaultValue={this.state.sliderPosition}
                                     weightUnit={this.state.weightUnit} onAfterChange={this.onAfterChange}
                                     springNumber={parseInt(this.state.springNumber, 10)}
                                     sliderKey={this.state.sliderKey} />
                    <Button name={'kg'} onButtonClick={this.onButtonClick} />
                    <Button name={'lbs'} onButtonClick={this.onButtonClick} />
                </div>
            </div>
        );
    }
}

export default App;
