import React from 'react';
import Button from './Button'
import PropTypes from 'prop-types';

const ResistanceInput = ({onChange, onButtonClick, weightUnit, inputClass, invalidMsg, calcBtnClass, disabled}) => {
    const placeholder = `Enter resistance (in ${weightUnit})`
    const baseTextInputClass = 'res-input'
    const textInputClass = inputClass ? `${baseTextInputClass} ${inputClass}` : baseTextInputClass

    const onChangeHandler = (e) => {
        onChange(e.target.value)
    }

    return (
        <div className="res-input-comp-wrapper">
            <div className="res-input-wrapper">
                <input data-tip data-for='resistanceToolTip' className={textInputClass} type="text"
                       onChange={onChangeHandler} placeholder={placeholder} />
                {inputClass === 'invalid' &&
                    <small className={inputClass}>{invalidMsg}</small>
                }
            </div>
            <Button className={calcBtnClass} name={'CALC'} disabled={disabled}
                    onClick={onButtonClick} />
        </div>
    )
}

ResistanceInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    weightUnit: PropTypes.string.isRequired,
    inputClass: PropTypes.string,
    invalidMsg: PropTypes.string.isRequired,
    calcBtnClass: PropTypes.string,
    disabled: PropTypes.bool
}

ResistanceInput.defaultProps = {
    disabled: false
}

export default ResistanceInput;