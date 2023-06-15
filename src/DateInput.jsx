import React from 'react';
import { Form } from "react-bootstrap";

function displayFormat(date) {
  
  if (date instanceof Date) {
    return date.toDateString();
  } else if(date!=null) {
    //(typeof date)
    return new Date(date).toDateString();
  }else{
    return '';
  }
}


function editFormat(date) {
  //(date+"skad")
  if (date instanceof Date && date!='null') {
    
    return date.toISOString().substr(0, 10);
  } else {
   
    return '';
  }
}


function unformat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:editFormat( props.value),
      focused: false,
      valid: true,
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
   
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    //('onblur'+e.target.value)

    const { value, valid: oldValid } = this.state;
    
    const { onValidityChange, onChange } = this.props;
    const dateValue = unformat(value);
    const valid = value === '' || dateValue instanceof Date;
    //(dateValue+"dateValue")
    if (valid !== oldValid || onValidityChange) {
      //("onValidityChange")
      onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid:true });
    if (valid){
      //("onvalid")
      
      onChange(e, dateValue);
    }
  }

  onChange(e) {
    //('onchange'+e.target.value)

    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  render() {
    const { valid, focused, value } = this.state;
    const { value: origValue, name } = this.props;
    const className = (!valid && !focused) ? 'invalid' : null;
    let displayValue
    if(focused||!valid){
      //("valid if");
      displayValue=value;
    }else{
      //("else plays"+origValue);
      displayValue =displayFormat(origValue);
      //(displayValue+" displayValue")
    }
    return (
      <Form.Control
        type="text"
        size={20}
        name={name}
        className={className}
        value={displayValue}
        placeholder={focused ? 'yyyy-mm-dd' : null}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}   