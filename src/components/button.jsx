import React from 'react';

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onButtonClick(this.props.name);
    }

    render() {
        let _className = 'resistance-btn';
        if (this.props.buttonClass) {
            _className += ` ${this.props.buttonClass}`;
        }

        return (<input className={_className} name={this.props.name} type='button' onClick={this.onClick}
                       value={this.props.name} disabled={this.props.disabled} />);
    }
}

export default Button;
