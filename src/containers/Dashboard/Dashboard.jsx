import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { getQuestionnaire, getAllQuestionnaires } from '../../actions/questionnaires';
import Spinner from '../../components/Spinner/Spinner';
import CardItem from '../../components/Card/Card';
import { Container, Row, Col} from 'reactstrap';
import { getHost } from '../../utils/pathUtils';
import Button from "reactstrap/es/Button";
import { AddCircle } from "@material-ui/icons"
import {Divider} from "@material-ui/core";
import {Switch, Route, Link} from "react-router-dom";
import QuestionnaireDetails from '../../components/QuestionnaireDetails/QuestionnaireDetails';
import CreateQuestionnaire from '../CreateQuestionnaire/CreateQuestionnaire';


class Dashboard extends Component{
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.getQuestionnaireForUser();
  }

  render(){
    if (this.props.questionnaires && this.props.questionnaires.allQuestionnaires ){

      const {allQuestionnaires} = this.props.questionnaires;
      console.log(allQuestionnaires);
      return(
          <div className = "Dashboard">
              <Row>
                <Col md={4} className="SideNav">

                  <ul>
                    Surveys
                    < Link to='/dashboard/createsurvey'>
                        <li><AddCircle/>New</li>
                    </Link>
                  


                  {mapQuestionnaires(allQuestionnaires)}
                  </ul>

                  <Divider/>
                  <ul>
                    Tests
                    < Link to='/dashboard/createtest'>
                        <li><AddCircle/>New</li>
                    </Link>

                  </ul>

                </Col>
                <Col className="Main">
                    <Switch>
                      <Route exact path="/dashboard"   render={(props) => 
                        <div>
                          Some content here
                        </div>
                        }/>                      
                        <Route exact path="/dashboard/detail/:id" component={QuestionnaireDetails}/>
                        <Route exact path="/dashboard/createsurvey"   render={(props) => <CreateQuestionnaire {...props} type={"survey"} /> } />
                        <Route exact path="/dashboard/createtest"  render={(props) => <CreateQuestionnaire {...props} type={"test"} /> } />
                    </Switch>
                </Col>
              </Row>
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

const mapQuestionnaires = (data, type) => {
  console.log(data);
  return data.map((value, index)=>{
    return (
        <li>
          < Link to={{
            pathname: `/dashboard/detail/${value.id}`,
            state: {
              questionnaire: {value}
            }
          }}> {value.title} </Link>
        </li>
    )
  })
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    ...state,
    questionnaires: state.questionnaire
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getQuestionnaireForUser: () => dispatch(getAllQuestionnaires())
  })
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);