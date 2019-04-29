import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DetailCard.scss'
import { Card, CardActionArea, CardContent, Button, CardActions, Typography } from '@material-ui/core';
import AccordianItem from '../AccordianItem/AccordianItem';
import { getReport } from '../../api/questionnaire';
import { config, getToken } from '../../utils/userUtils';
import { triggerDownload } from '../../utils/IOUtils';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  EmailIcon,
} from 'react-share';
import { getHost } from '../../utils/pathUtils';

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
    const { title, description, createTime, responses, children, width, id, type } = this.props; 
    console.log(type);
    return (
      <div className = "DetailCard"> 
        <Card style={{width:width}}>
          <CardContent>
            <Typography variant="h2" color="secondary">
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
          <EmailShareButton 
            url={`${getHost()}/${type.toLowerCase()}/${id}`}
            subject={`Take this ${type.toLowerCase()}!`} 
>              <EmailIcon/>
            </EmailShareButton>
            <TwitterShareButton 
              url={`${getHost()}/${type.toLowerCase()}/${id}`}
           ><TwitterIcon/></TwitterShareButton>
                       <FacebookShareButton 
              url={`${getHost()}/${type.toLowerCase()}/${id}`}
           ><FacebookIcon/></FacebookShareButton>
          
            <Button className="export-button" size="large" variant="contained" color="primary" onClick={()=>{
              getReport(id, getToken(this.props), "tsv", triggerDownload)
              }
            }>
            Export
            </Button>
          </CardActions>
          <Button fullWidth className="button" variant="contained" color="secondary" onClick={()=>this.props.history.push("/dashboard")}>Back</Button>   
        </Card>
         
      </div>
    )
  }

}

DetailCard.propTypes = propTypes;
DetailCard.defaultProps = defaultProps;

export default DetailCard;