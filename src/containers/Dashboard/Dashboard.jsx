import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Dashboard.scss';
import { getQuestionnaire, getAllQuestionnaires } from '../../actions/questionnaires';
import Spinner from '../../components/Spinner/Spinner';
import CardItem from '../../components/Card/Card';


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
        <div>
          {mapQuestionnaires(allQuestionnaires)}
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

const mapQuestionnaires = (data) => {
  console.log(data);
  return data.map((value, index)=>{
    return (    
      <div>
        <CardItem 
          id={value.id}
          title={value.title} 
          description={value.description}
          totalResponses={value.responses.length}
          anonymous={value.anonymous}
          values={value.responses}
          onClick={()=>alert("test")}
          />
      </div>
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