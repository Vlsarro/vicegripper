import React from 'react';

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onButtonClick(this.props.name);
    }

    render() {
        return (<input className='resistance-btn' name={this.props.name} type='button' onClick={this.onClick}
                       value={this.props.name}/>);
    }
}

export default Button;
