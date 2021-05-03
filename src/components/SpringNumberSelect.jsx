import React from "react"
import uniqueId from "lodash/uniqueId"
import PropTypes from "prop-types"

const SpringNumberSelect = ({onChange, springNumber}) => {
    const id = uniqueId('prefix-')
    const labelStyle = {
        padding: '5px',
        verticalAlign: 'middle',
        fontWeight: 'normal',
        marginBottom: '0'
    };

    const onChangeHandler = (e) => {
        onChange(e.target.value)
    }

    return (
        <div className="spring-select-wrapper">
            <label className="spring-label" style={labelStyle} htmlFor={id}>Number of springs</label>
            <select className="spring-select" id={id} onChange={onChangeHandler} value={springNumber}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    )
}

SpringNumberSelect.propTypes = {
    springNumber: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SpringNumberSelect;
