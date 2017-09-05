import React from 'react';
import Button from './button'


class ResistanceInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    onButtonClick() {
        this.props.onButtonClick();
    }

    render() {
        let _textInputClass,
            placeholder = `Enter resistance (in ${this.props.weightUnit})`;
        if (this.props.inputClass) {
            _textInputClass = `res-input ${this.props.inputClass}`;
        } else {
            _textInputClass = 'res-input';
        }
        return (
            <div className="res-input-wrapper">
                <input className={_textInputClass} type="text"
                       onChange={this.onChange} placeholder={placeholder} />
                <Button buttonClass={this.props.calcBtnClass} name={'CALC'} disabled={this.props.disabled}
                        onButtonClick={this.onButtonClick} />
            </div>
        )
    }
}


export default ResistanceInput;