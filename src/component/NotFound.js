import React, { Component } from 'react';
import errorImg from '../pic/404.jpg';



class NotFound extends Component {
    render() {
      return (
        <div style={{padding: 20, textAlign: "center", color:"#00ad00"}}>
            <h1> #404 error</h1>
            <img src={errorImg} alt ="404 error "/>
        </div>
      );
    }
  }
  
  export default NotFound;