type ButtonProps = {
  className?: string,
  name: string,
  disabled?: boolean,
  onClick: Function
}

const Button = ({className = '', name, disabled = false, onClick}: ButtonProps): JSX.Element => {
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

export default Button;
