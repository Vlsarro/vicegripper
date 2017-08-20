import React, { Component } from 'react';

import Button from './../components/button.jsx'

import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css';
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

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

		const divWrapperStyle = {
			display: 'inline-block'
		}
		return (
			<div style={divWrapperStyle}>
				<label style={labelStyle} htmlFor={this.id}>Number of springs</label>
				<select id={this.id} onChange={this.onChange}>
					<option value="1">1</option>
					<option value="2" disabled>2</option>
					<option value="3" disabled>3</option>
				</select>
			</div>
		);
	}
}

class GripToggle extends React.Component {

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.props.onGripChange(e.target.checked);
	}

	render() {
		let labelStyle = {
			marginLeft: '20px',
			verticalAlign: 'middle',
			fontWeight: 'normal',
			marginBottom: '0'
		};

		const spanStyle = {
			padding: '5px',
			verticalAlign: 'middle',
			fontWeight: 'normal',
			marginBottom: '0'
		}

		return (
			<label style={labelStyle}>
				<span style={spanStyle}>Inner</span>
				<Toggle icons={false}  onChange={this.onChange} />
				<span style={spanStyle}>Outer</span>
			</label>
		);
	}
}

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
				<Slider dots step={1} defaultValue={this.props.defaultPosition} max={11} onAfterChange={this.onAfterChange} />
				<p>{this.props.resistance + ' ' + this.props.weightUnit}</p>
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

		const initialSliderPosition = 1;

		this.state = {
			weightUnit: 'lbs',
			grip: INNER,
			springNumber: 1,
			resistance: resistanceInnerValues[initialSliderPosition],
			sliderPosition: initialSliderPosition
		};
	}

	updateResistance(newPosition) {
		let stateObject, value;
		if (newPosition !== undefined) {
			value = this.state.grip === INNER ? resistanceInnerValues[newPosition] : resistanceOuterValues[newPosition];
			stateObject = {sliderPosition: newPosition, resistance: this.state.weightUnit === 'kg' ? lbToKg(value) : value};
		} else {
			value = this.state.grip === INNER ? resistanceInnerValues[this.state.sliderPosition] : resistanceOuterValues[this.state.sliderPosition];
			stateObject = {resistance: this.state.weightUnit === 'kg' ? lbToKg(value) : value};
		}
		this.setState(stateObject);
	}

	onSpringNumberChange(newSpringNumber) {
		this.setState({springNumber: newSpringNumber});
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
					<SpringNumberSelect initialValue={this.state.springNumber} onSpringNumberChange={this.onSpringNumberChange}  />
					<GripToggle initialGrip={this.state.grip} onGripChange={this.onGripChange} />
					<ResistanceSlider resistance={this.state.resistance} defaultPosition={this.state.sliderPosition}
										weightUnit={this.state.weightUnit} grip={this.state.grip} onAfterChange={this.onAfterChange}  />
					<Button name={'kg'} onButtonClick={this.onButtonClick} />
					<Button name={'lbs'} onButtonClick={this.onButtonClick} />
				</div>
			</div>
		);
	}
}

export default App;
