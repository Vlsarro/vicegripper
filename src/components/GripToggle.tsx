import Switch from 'rc-switch';
import 'rc-switch/assets/index.css'

type GripToggleProps = {
    onChange: Function
}

const GripToggle = ({onChange}: GripToggleProps): JSX.Element => {

    const handleChange = (checked: boolean, e: any) => {
        onChange(checked)
    }

    return (
        <div className="toggle-wrapper">
            <label>
                <span className="grip" title="Inner grip">I</span>
                <Switch onChange={handleChange} />
                <span className="grip" title="Outer grip">O</span>
            </label>
        </div>
    )
}

export default GripToggle
