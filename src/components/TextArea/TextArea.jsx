import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextArea.scss';
import { Input } from 'reactstrap';

const propTypes = {

};

const defaultProps = {

};

const TextArea = props => {
  const {
    input,
    label,
    meta: { touched, error } 
  } = props;

  return(
    <div className="TextArea">
      <label> {label} </label>
      <div>
        <Input type="textarea" {...input} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

export default TextArea;