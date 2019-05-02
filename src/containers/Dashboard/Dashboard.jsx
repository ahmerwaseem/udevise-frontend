import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { getAllQuestionnaires } from '../../actions/questionnaires';
import { getUserSubmitted } from '../../actions/user';
import Spinner from '../../components/Spinner/Spinner';
import PaginateWrapper from '../../components/PaginateWrapper/PaginateWrapper';
import { Container, Row, Col, Badge} from 'reactstrap';
import { getHost } from '../../utils/pathUtils';
// import Button from "reactstrap/es/Button";
import { AddCircle } from "@material-ui/icons"
import {Divider, Button, Typography} from "@material-ui/core";
import {Switch, Route, Link} from "react-router-dom";
import CreateQuestionnaire from '../CreateQuestionnaire/CreateQuestionnaire';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid';
import QuestionnaireTable from '../../components/QuestionnaireTable/QuestionnaireTable';
import UserSubmissionTable from '../../components/UserSubmissionTable/UserSubmissionTable';



class Dashboard extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getQuestionnaireForUser();
    this.props.getUserSubmissions();
  }

  render(){

    if (this.props.questionnaires && this.props.questionnaires.allQuestionnaires ){
      const {allQuestionnaires,} = this.props.questionnaires;
      const {submissions} = this.props.user;
      return(
      <div className = "Dashboard"> 

        <PaginateWrapper data={allQuestionnaires.filter(x=>x.type == "SURVEY")} Component={QuestionnaireTable} type="SURVEY" {...this.props}/>
        <PaginateWrapper data={allQuestionnaires.filter(x=>x.type == "QUIZ")} Component={QuestionnaireTable} type="QUIZ" {...this.props} />
        {submissions && 
          <PaginateWrapper data={submissions} Component={UserSubmissionTable} {...this.props}/>
        }
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

const mapStateToProps = (state) => {
  return {
    ...state,
    questionnaires: state.questionnaire
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getQuestionnaireForUser: () => dispatch(getAllQuestionnaires()),
    getUserSubmissions : () => dispatch(getUserSubmitted())
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);