import  React, { Component } from 'react';
import { Input } from 'reactstrap';
import './SelectField.scss'
import uuid from "uuid";
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import { InputLabel, FormHelperText, FormLabel } from '@material-ui/core';

let init = false;

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}


const SelectField = (props) => {
  
 const {
    input,
    label,
    meta: { touched, error },
    name,
    selectvalues,
    ...custom
    
  } = props;


  if (!init){
    selectvalues.unshift("");
    init =true;
  }

 return (
  <FormControl error={touched && (typeof error == 'string')}>
    <FormLabel component="legend">{label}</FormLabel>
    <Select
      autoWidth={true}
      native
      {...input}
      {...custom}
      inputProps={{
        name: name,
      }}
    >
      {selectvalues.map((values, index)=>{
        if (values !== null && values !== undefined)
          return(
          <option key={uuid.v4()} value={values.option ? values.option : values}>{values.value ? values.value : values}</option>
      )
      })}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)
}



export default SelectField;