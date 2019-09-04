import React from "react";
import uniqueId from "lodash/uniqueId";


class SpringNumberSelect extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const id = uniqueId("prefix-");
        this.setState({id: id});
    }

    onChange(e) {
        this.props.onSpringNumberChange(e.target.value);
    }

    render() {
        const labelStyle = {
            padding: '5px',
            verticalAlign: 'middle',
            fontWeight: 'normal',
            marginBottom: '0'
        };

        return (
            <div className="spring-select-wrapper">
                <label className="spring-label" style={labelStyle} htmlFor={this.id}>Number of springs</label>
                <select className="spring-select" id={this.id} onChange={this.onChange} value={this.props.springNumber}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        );
    }
}

export default SpringNumberSelect;
