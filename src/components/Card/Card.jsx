import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Badge } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import classnames from 'classnames';
import { getHost } from '../../utils/pathUtils';



const styles = theme => ({
  card: {
    maxWidth: 800,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  media: {
    height: 140,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

const defaultProps = {
  totalResponses: 0,
};

class CardItem extends Component{
  constructor(props){
    super(props);
  }

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() { 
    const { classes, title, description, totalResponses, onClick, values } = this.props;
    console.log(values);
    return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>

      <Badge color="primary" showZero badgeContent={totalResponses ? totalResponses : 0} className={classes.margin} onClick={onClick}>
        Total Responses
      </Badge>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <a href={`${getHost()}/answer/${this.props.id}`}>Direct Link</a>
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
      </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {values && values.map((item,index)=>{
              return(
                <div>
                                  test1
                  {item.answers.map((subItem,subIndex)=>{
                    return (<div>{`${subIndex+1}. ${subItem.answer}`}</div>)
                  })}
                </div>
              )
            })}
          </CardContent>
        </Collapse>
    </Card>
  )
  };

}

CardItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

CardItem.defaultProps = defaultProps;

export default withStyles(styles)(CardItem);