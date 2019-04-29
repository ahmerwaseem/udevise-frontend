import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './QuestionnaireDetails.scss'
import Spinner from '../Spinner/Spinner';
import { Alert, Table } from 'reactstrap';
import { getHost } from '../../utils/pathUtils';
import {Doughnut} from 'react-chartjs-2';

const propTypes = {

};

const defaultProps = {

};

class QuestionnaireDetails extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    if (this.props.location ){
      const { value }  = this.props.location.state.questionnaire;
  
      let data = getQuestionnaireStats(value.questions);
      console.log("what")

      return(
        <div>
          <h4>{`Name: ${value.title}`}</h4>
          {value.description && <h5>{`Description: ${value.description}`}</h5>}
          <h5>{`Total Responses Recieved: ${value.responses ? value.responses.length : 0}`}</h5>
          <h5>Direct Link: <a href={`${getHost()}/answer/${value.id}`}>Click Here</a></h5>

        <h5></h5>
          {getQuickResultsTable(data)}
        </div>
      )
    } else{
      return (
        <div className = "Dashboard"> 
          <Spinner/> 
        </div>
      )
    }
  }

}

const getQuestionnaireStats = (data) => {
  return data.map((value, index)=>{
    return (
      <div>
        <h5>{value.question}</h5>
        {value.answersGiven ? processAnswers(value) : "No responses have been submitted." }
      </div>
    )
  })
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

  return obj;
}

const getQuickResultsTable = (data) =>{
  console.log("quick results table")
  return (
    <div>
    <Table>
      <thead>
        <tr>
          <th>Answers Given</th>
          <th># of Occurrences</th>
        </tr>
      </thead>
      <tbody>
        {getTableRows(data)}
      </tbody>
    </Table>


    <Doughnut data={prepareDataForVisualizarion(data)} />
    </div>
  )
}

const getTableRows = (obj) => {
  return Object.keys(obj).map((key)=> {
    
    return (
          <tr>
            <th scope="row">{key}</th>
            <td>{obj[key]}</td>
          </tr>
    )
  })
}

const prepareDataForVisualizarion = (obj) =>{
  console.log("its trying")
  let displayObject; 
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
  displayObject.labels = labels;
  datasetObj.data = data;
  datasetObj.backgroundColor = color;
  datasetObj.hoverBackgroundColor = color;
  datasets = datasets.push(datasetObj);

  displayObject.datasets = datasets;
  return displayObject;
}


QuestionnaireDetails.propTypes = propTypes;
QuestionnaireDetails.defaultProps = defaultProps;

export default QuestionnaireDetails;