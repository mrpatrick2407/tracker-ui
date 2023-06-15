import { Form } from "react-bootstrap";
import React from 'react';

function format(n){
return n!=null?n.toString():'';
}

function unformat(str){
    const val=parseInt(str,10)
    return Number.isNaN(val)?null:val;
}



export default class Numinput extends React.Component {
    constructor(props){
        super(props);
        this.onChange=this.onChange.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.state={value:format(props.value)}
        console.log(format(props.value))
    }
    onChange(e){
        
        if (e.target.value.match(/^\d*$/)) {
            const val=e.target.value;
           this.setState({ value: val });
        }
    }

    onBlur(e){
        const {onChange}=this.props;
        const value = this.state.value;
        console.log(value+"from child");
        onChange(e, unformat(value))
    }
    render(){
        const {value}=this.state;
        
        return(
            <Form.Control 
            type="text"
            value={value}
            name={this.props.name}
            onChange={this.onChange}
            onBlur={this.onBlur}/>
        )
    }

}