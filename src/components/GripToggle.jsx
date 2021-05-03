import React from 'react';
import Toggle from 'react-toggle'
import PropTypes from 'prop-types';
import 'react-toggle/style.css'

const GripToggle = ({onChange}) => {

    const onChangeHandler = (e) => {
        onChange(e.target.checked)
    }

    return (
        <div className="toggle-wrapper">
            <label>
                <span className="grip" title="Inner grip">I</span>
                <Toggle icons={false} onChange={onChangeHandler} />
                <span className="grip" title="Outer grip">O</span>
            </label>
        </div>
    )
}

GripToggle.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default GripToggle
