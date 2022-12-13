import uniqueId from "lodash/uniqueId"

type SpringNumberSelectProps = {
    onChange(value: number): void,
    springNumber: number
}

const SpringNumberSelect = ({onChange, springNumber}: SpringNumberSelectProps): JSX.Element => {
    const id = uniqueId('prefix-')
    const labelStyle = {
        padding: '5px',
        verticalAlign: 'middle',
        fontWeight: 'normal',
        marginBottom: '0'
    };

    const onChangeHandler = (e: any) => {
        onChange(parseInt(e.target.value, 10));
    }

    return (
        <div className="spring-select-wrapper">
            <label 
                className="spring-label" 
                style={labelStyle} 
                htmlFor={id}
            >
                Number of springs
            </label>
            <select 
                className="spring-select" 
                id={id} 
                onChange={onChangeHandler} 
                value={`${springNumber}`}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    )
}

export default SpringNumberSelect;
