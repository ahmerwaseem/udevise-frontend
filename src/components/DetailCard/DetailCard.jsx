import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DetailCard.scss'
import { Card, CardActionArea, CardContent, Button, CardActions, Typography } from '@material-ui/core';
import AccordianItem from '../AccordianItem/AccordianItem';

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createTime: PropTypes.string,
  responses: PropTypes.number

};

const defaultProps = {
  responses: [],
  width: '100%',
};

class DetailCard extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const { title, description, createTime, responses, children, width } = this.props; 
    return (
      <div className = "DetailCard"> 
        <Card style={{width:width}}>
          <CardContent>
            <Typography variant="h5" color="secondary" component="h2">
              {title}
            </Typography>
            {description && <Typography color="textSecondary">
              {description}
            </Typography>
            }
            {createTime && 
            <Typography component="p">
              Created: {createTime}
            </Typography>
            }
            <Typography component="p">
              Total Responses: {responses.length}
            </Typography>
            
            {children}
          </CardContent>
          <CardActions>
            <Button size="large" color="primary">Share</Button>
            <Button size="large" color="primary">Export Responses</Button>
          </CardActions>
        </Card>
         
      </div>
    )
  }

}

DetailCard.propTypes = propTypes;
DetailCard.defaultProps = defaultProps;

export default DetailCard;