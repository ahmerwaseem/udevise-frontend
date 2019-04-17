import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextArea.scss';
import { Input } from 'reactstrap';
import InputField from '../InputField/InputField';

const propTypes = {

};

const defaultProps = {

};

const TextArea = props => {
  const {
    input,
    label,
    meta: { touched, error },
    placeholder
  } = props;

  return(
    <InputField {...props}   
    multiline={true}
    rows={5}
    rowsMax={5}/>
  )
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

export default TextArea;