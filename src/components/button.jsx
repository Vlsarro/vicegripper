class Button extends React.Component {
	render() {
		return (<input className='resistance-btn' name={this.props.name} type='button' value={this.props.name}/>);
	}
}

export default Button;
