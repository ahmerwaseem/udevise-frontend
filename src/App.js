import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Typography, Fab } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="splash-page">
          <div className="text-box">
            <Typography variant="h1" color="secondary" className="heading-primary">
              <span className="heading-primary-main">Udevise</span>
              <span className="heading-primary-sub" onClick>Get The Answers You Want</span>
            </Typography>
            <div className="buttonContainer">

            <Fab
              className="button"
              variant="extended"
              size="large"
              color="primary"
              onClick={()=>{this.props.history.push("/create/quiz")}}
            >
              Create A Quiz
            </Fab>
            <Fab
              className="button"
              variant="extended"
              size="large"
              color="primary"
              onClick={()=>{this.props.history.push("/create/survey")}}
              >
              Create A Survey
            </Fab>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}


export default withRouter(connect(mapStateToProps)(App));
