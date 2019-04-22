import  React from 'react';
import './InputField.scss';
import { TextField } from '@material-ui/core';


const InputField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  if (typeof input.value == "string"){
  input.onChange(input.value.split())
  }
  return (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    fullWidth
    {...input}
    {...custom}
  />
)
}

export default InputField;