import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputField.scss';
import {Input} from 'reactstrap';
import { TextField } from '@material-ui/core';

const propTypes = {

};

const defaultProps = {

};

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

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;