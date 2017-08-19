import React, { Component } from 'react';

import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css';
import Toggle from 'react-toggle'
import 'react-toggle/style.css'

import './App.css';

import uniqueId from 'lodash/uniqueId';


var resistanceInnerValues = [13.715, 21.625, 31.285, 42.695, 55.865, 70.785,
						     87.455, 105.885, 126.056, 147.995, 171.685, 197.125],
	resistanceOuterValues = [9.6005, 15.1375, 21.8995, 29.8865, 39.1055, 49.5495,
		                     61.2185, 74.1195, 88.2455, 103.5965, 120.1795, 137.9875]


function lbToKg (lb) {
	return lb/2.2046;
}


class SpringNumberSelect extends React.Component {
	componentWillMount() {
	    const id = uniqueId("prefix-");
	    this.setState({id: id});
	}

	render() {
		const id = this.state.id;
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
		      	<select id={this.id}>
				  	<option value="1">1</option>
				  	<option value="2" disabled>2</option>
				  	<option value="3" disabled>3</option>
				</select>
			</div>
	    );
	  }
}

class GripToggle extends React.Component {

	render () {
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
			  	<Toggle icons={false} />
			  	<span style={spanStyle}>Outer</span>
			</label>
		);
	}
}

class Button extends React.Component {
	render() {
		return (<input className='resistance-btn' name={this.props.name} type='button' value={this.props.name}/>);
	}
}

function log(value) {
  	console.log(lbToKg(resistanceInnerValues[value])); //eslint-disable-line
}

class ResistanceSlider extends React.Component {
	render () {
		let divWrapperStyle = { margin: '40px 40px 20px 40px' };
		return (
			<div style={divWrapperStyle}>
				<Slider dots step={1} defaultValue={1} max={11} onAfterChange={log} />
				<p>0</p>
			</div>
		);
	}
}

class App extends Component {

  	render() {
	    return (
			<div className="App">
				<div className="App-header">
					<h2>VICE GRIPPER</h2>
				</div>
				<div className="main-content">
					<SpringNumberSelect />
					<GripToggle />
					<ResistanceSlider />
					<Button name={'kg'} />
					<Button name={'lbs'} />
				</div>
			</div>
	    );
  	}
}

export default App;
