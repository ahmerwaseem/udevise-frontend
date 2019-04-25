import  React from 'react';
import './InputField.scss';
import { TextField, InputAdornment } from '@material-ui/core';


const InputField = (props) => {
  const {
    label,
    input,
    type,
    converttoarray,
    placeholder,
    defaultValue,
    meta: { touched, invalid, error },
    ...custom
  } = props;

  if (typeof input.value == "string" && converttoarray){
    input.onChange(input.value.split())
  }
  return (
  <TextField
    type={type ? type : "text"}
    label={label}
    placeholder={placeholder ? placeholder.toString() : label}
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    {...input}
    {...custom}
  
  />
)
}

export default InputField;