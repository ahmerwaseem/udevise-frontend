import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './QuestionnaireDetails.scss'
import Spinner from '../Spinner/Spinner';
import { Alert, Table } from 'reactstrap';
import { getHost } from '../../utils/pathUtils';

const propTypes = {

};

const defaultProps = {

};

class QuestionnaireDetails extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    console.log("here")
    console.log(this.props.location)
    if (this.props.location ){
      const { value }  = this.props.location.state.questionnaire;
  
      return(
        <div>
          <h4>{`Name: ${value.title}`}</h4>
          {value.description && <h5>{`Description: ${value.description}`}</h5>}
          <h5>{`Total Responses Recieved: ${value.responses ? value.responses.length : 0}`}</h5>
          <h5>Direct Link: <a href={`${getHost()}/answer/${value.id}`}>Click Here</a></h5>

        <h5></h5>
          {getQuestionnaireStats(value.questions)}
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
  console.log(data);
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

  return (
    <Table>
      <thead>
        <tr>
          <th>Answers Given</th>
          <th># of Occurrences</th>
        </tr>
      </thead>
      <tbody>
        {getTableRows(obj)}
      </tbody>
    </Table>
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

QuestionnaireDetails.propTypes = propTypes;
QuestionnaireDetails.defaultProps = defaultProps;

export default QuestionnaireDetails;