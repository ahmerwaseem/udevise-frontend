import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './InputField.scss';
import {Input} from 'reactstrap';

const propTypes = {

};

const defaultProps = {

};

const InputField = props => {
  const {
    input,
    label,
    type,
    meta: { touched, error } ,
    selectValues,
    hidden,
    placeholder
  } = props;

  if (hidden){
    return null;
  } else return(
    <div className="InputField">
      <label> {label} </label>
      <div>
        <Input {...input} type={type} placeholder={placeholder}  />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
    )

}

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;