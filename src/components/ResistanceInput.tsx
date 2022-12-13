import Button from './Button'

type ResistanceInputProps = {
    onChange: Function,
    onButtonClick: Function,
    weightUnit: string,
    inputClass?: string,
    invalidMsg: string,
    calcBtnClass?: string,
    disabled?: boolean
}

const ResistanceInput = ({onChange, onButtonClick, weightUnit, inputClass, invalidMsg, calcBtnClass, disabled = false}: ResistanceInputProps): JSX.Element => {
    const placeholder = `Enter resistance (in ${weightUnit})`
    const baseTextInputClass = 'res-input'
    const textInputClass = inputClass ? `${baseTextInputClass} ${inputClass}` : baseTextInputClass

    const onChangeHandler = (e: any) => {
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

export default ResistanceInput;