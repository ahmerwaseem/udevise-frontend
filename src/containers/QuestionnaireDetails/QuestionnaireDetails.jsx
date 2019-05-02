import  React, { Component } from 'react';
import { connect } from 'react-redux';
import './QuestionnaireDetails.scss';
import { Alert} from 'reactstrap';
import DetailCard from '../../components/DetailCard/DetailCard';
import { getDetailsById, CLEAR_QUESTIONNAIRES } from '../../actions/questionnaires';
import AccordianItem from '../../components/AccordianItem/AccordianItem';
import { Typography,Button, Card, CardContent, CardMedia, Grid} from '@material-ui/core';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { getHost } from '../../utils/pathUtils';
import { Doughnut } from 'react-chartjs-2';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as CopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopy from '@material-ui/icons/FileCopyTwoTone'
import ArrowBack from '@material-ui/icons/ArrowBack'


import {CopyToClipboard} from 'react-copy-to-clipboard';

const TabContainer = (props) => {
  return (
    <Typography color="primary" component="div">
      {props.children}
    </Typography>
  );
}

class QuestionnaireDetails extends Component{
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      copied: false
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  componentWillMount() {
    this.props.getDetail(this.props.match.params.id)
  }

  
  render(){
    console.log(this.props.questionnaire);
    const { questionnaire } = this.props;
    const { value } = this.state;

    return(
    <div className="QuestionnaireDetails">
      <div className="QuestionnaireDetailsWrapper">
        {(questionnaire && questionnaire.detail)
        &&
        <div>
        <DetailCard
          title={questionnaire.detail.title}
          description={questionnaire.detail.description}
          createTime={questionnaire.detail.createTime}
          responses={questionnaire.detail.responses}
          id={questionnaire.detail.id}
          type={questionnaire.detail.type}
          {...this.props}
        >
        {questionnaire.detail.questions && 
        <div>
          <Typography color="textSecondary" className="text-wrap"> 
            Direct Link: {`${getHost()}/${questionnaire.detail.type.toLowerCase()}/${questionnaire.detail.id}  `} 
            <CopyToClipboard text={`${getHost()}/${questionnaire.detail.type.toLowerCase()}/${questionnaire.detail.id}`}
          onCopy={() => this.setState({copied: true})}>
                      <FileCopy color="primary" /> 
            </CopyToClipboard>
            {this.state.copied ? "Copied" : null}
          </Typography> 
          </div>}
        
          

        <div >
          <Paper>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Quick Results" />
              <Tab label="Individual Responses" />
            </Tabs>
          </Paper>

          {value === 0 && 
            <TabContainer className="tabContainer">
              {questionnaire.detail.questions && questionnaire.detail.questions.map((item) => {
                return (
                  <AccordianItem heading={`${item.question} ${item.correctAnswer ? ` (Answer: ${item.correctAnswer.toString()})` : ""}`}>
                    {item.answersGiven ? processAnswers(item) : "No responses have been submitted." }
                  </AccordianItem>
                )
              })}
            </TabContainer>}
          {value === 1 && 
            <TabContainer  className="tabContainer">
                {questionnaire.detail.responses && questionnaire.detail.responses.map((item)=>{
                  return (

                    <Card>
                    <div>
                      <CardContent>
                        <Typography variant="h6">

                        {(item.user) ? 
                      <div>
                        {`${item.user.firstName} ${item.user.lastName} - ${item.user.emailAddress}`}
                      </div> :
                      <div>
                        Anonymous User
                      </div>
                      }
                      
                      {item.submitTime}
                      <Link to={`/response/${this.props.match.params.id}/${item.responseId}`}>
                        See Details
                      </Link>
                        </Typography>
                      </CardContent>
                    </div>
                    {(item.user) &&
                    <CardMedia
                      image={item.user.imageUrl}
                    />}
                  </Card>
                  )
                })}
            </TabContainer>}
        </div>
        </DetailCard>
      </div>
        }
      </div>
    </div>
    )
  }

}


const processAnswers= (data) => {
  if (data){
    if (data.type !== "TEXTAREA" && data.type !== "TEXT") {
      return countAnswers(data.answersGiven);
    } else {
      return(
        <Alert color="info">
          Free form answers, please review these individually
        </Alert>
      )
    }
  }
}

const countAnswers = (data) => {
  let obj = {};
  if (data){
    data.map((value)=>{
      if (value){
        if (obj[value.answer]){
          obj[value.answer] = ++obj[value.answer];
        } else {
          obj[value.answer] = 1;
        }
      }
    })
  }

  return (
    <Grid container spacing={24}>    
    <Grid item xs={12} sm={6}>
    <Doughnut data= {prepareDataForVisualization(obj)} />
    </Grid>
    <Grid item xs={12} sm={6}>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Answer Given</TableCell>
            <TableCell align="right"># of Occurrences</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(obj).map((key)=> {
            return (
              <TableRow>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right"> {obj[key]} </TableCell>
              </TableRow>
            )
          })
        } 
        </TableBody>
      </Table>
    </Paper>
    </Grid>
    </Grid>
  )
}

const prepareDataForVisualization = (obj) =>{
  console.log("its trying")
  let displayObject = {};
  let labels = [];
  let datasets = [];  
  let datasetObj = {};
  let data = [];
  let color = [];
  Object.keys(obj).map((key)=> {
    labels.push(key);
    data.push(obj[key]);
    color.push("#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}))
  })
  console.log(data);
  console.log(color);
  displayObject["labels"] = labels;
  datasetObj["data"] = data;
  datasetObj["backgroundColor"] = color;
  datasetObj["hoverBackgroundColor"] = color;
  datasets.push(datasetObj);

  displayObject["datasets"] = datasets;
  console.log(displayObject);
  return displayObject;
}

const mapStateToProps = (state) => {
  return {
    questionnaire: state.questionnaire,
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return({
    getDetail: (id) => {dispatch(getDetailsById(id))},
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionnaireDetails);