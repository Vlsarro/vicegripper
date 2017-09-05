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
        return (
            <div className="toggle-wrapper">
                <label>
                    <span className="grip" title="Inner grip">I</span>
                    <Toggle icons={false}  onChange={this.onChange} />
                    <span className="grip" title="Outer grip">O</span>
                </label>
            </div>
        );
    }
}

export default GripToggle;
