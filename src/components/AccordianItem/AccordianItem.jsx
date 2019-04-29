import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AccordianItem.scss'
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';


const propTypes = {
  // heading: PropTypes.string.isRequired,
  // children: PropTypes.node.isRequired,
};

class AccordianItem extends Component{
  constructor(props) {
    super(props);
  }
  render(){

    const {
      children,
      heading
    } = this.props;

    return (
      <div className = "AccordianItem"> 
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">{heading}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              {children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }

}

AccordianItem.propTypes = propTypes;

export default AccordianItem;