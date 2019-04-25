import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextArea.scss';
import { Input } from 'reactstrap';
import InputField from '../InputField/InputField';

const propTypes = {

};

const defaultProps = {
  rows: 5,
  rowsMax: 5,
};

const TextArea = props => {
  const {
    rows,
    rowsMax
  } = props;

  return(
    <InputField {...props}   
    multiline={true}
    rows={rows}
    rowsMax={rowsMax}/>
  )
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

export default TextArea;