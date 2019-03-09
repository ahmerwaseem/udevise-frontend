import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss'
import { FormControl, RadioGroup } from '@material-ui/core';

const propTypes = {

};

const defaultProps = {

};

const RadioButton = props => {
  <FormControl>
    <RadioGroup {...input} {...rest}>
      {this.props.children}
    </RadioGroup>
  </FormControl>
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;