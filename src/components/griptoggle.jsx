import React from 'react';

import Toggle from 'react-toggle'
import 'react-toggle/style.css'


class GripToggle extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onGripChange(e.target.checked);
    }

    render() {

        const spanStyle = {
            padding: '5px',
            verticalAlign: 'middle',
            fontWeight: 'normal',
            marginBottom: '0'
        };

        return (
            <div className="toggle-wrapper">
                <label>
                    <span style={spanStyle}>Inner</span>
                    <Toggle icons={false}  onChange={this.onChange} />
                    <span style={spanStyle}>Outer</span>
                </label>
            </div>
        );
    }
}

export default GripToggle;
