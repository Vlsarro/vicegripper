import React, { Component } from 'react';

import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css';
import Toggle from 'react-toggle'
import 'react-toggle/style.css'


import logo from './logo.svg';
import './App.css';

import uniqueId from 'lodash/uniqueId';

class SpringNumberSelect extends React.Component {
	componentWillMount() {
	    const id = uniqueId("prefix-");
	    this.setState({id: id});
	}

	render() {
		const id = this.state.id;
		console.log(id);
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
		    	<label style={labelStyle} htmlFor={this.id}>Spring number</label>
		      	<select id={this.id}>
				  	<option value="1">1</option>
				  	<option value="2">2</option>
				</select>
			</div>
	    );
	  }
}

class WeightConverter extends React.Component {

	render () {
		let labelStyle = {
			display: 'inline-block',
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
	        	<span style={spanStyle}>Kg</span>
			  	<Toggle icons={false} />
			  	<span>Pounds</span>
			</label>
		);
	}
}

function log(value) {
  	console.log(value); //eslint-disable-line
}

class ResistanceSlider extends React.Component {
	render () {
		let divWrapperStyle = { margin: 40 };
		return (
			<div style={divWrapperStyle}>
				<Slider dots step={1} defaultValue={1} max={11} onAfterChange={log} />
				<p>0</p>
			</div>
		);
	}
}

/*
<Toggle
			    defaultChecked={this.state.tofuIsReady}
			    icons={false}
			    onChange={this.handleTofuChange} />
 */

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>VICE GRIPPER</h2>
        </div>
        <div className="main-content">
	        <SpringNumberSelect />
	        <WeightConverter />
	        <ResistanceSlider />
        </div>
      </div>
    );
  }
}

export default App;
