import  React, { Component } from 'react';

class Spinner extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      top: '40%',
      bottom: 0,
      left: 0,
      right: 0,
    }
    return (
      <div style ={style}> 
        <span className="sr-only">Loading...</span>
        <div className="spinner-grow text-primary" role="status" />
        <div className="spinner-grow text-secondary" role="status" />
        <div className="spinner-grow text-primary" role="status" />
        <div className="spinner-grow text-secondary" role="status" />
      </div>
    )
  }

}

export default Spinner;