import React from 'react';
import PropTypes from 'prop-types';

const Button = ({className, name, disabled, onClick}) => {
    const baseInputClassName = 'resistance-btn';
    const inputClassName = className ? `${baseInputClassName} ${className}` : baseInputClassName;

    const onClickHandler = () => {
      onClick(name);
    }

    return (
      <input className={inputClassName} name={name} type='button' onClick={onClickHandler} value={name}
         disabled={disabled}/>
    )
}

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
  disabled: false,
  className: ''
}

export default Button;
