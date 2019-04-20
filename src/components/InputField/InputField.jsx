import  React from 'react';
import './InputField.scss';
import { TextField } from '@material-ui/core';


const InputField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
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

export default InputField;