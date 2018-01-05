import React, { Component } from 'react';
import pic from '../pic/logo.jpg';


class Text extends Component {
    constructor(prop) {
      super(prop);
      this.state = {leftPosition: prop.leftPos};
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState(prevState => ({
        leftPosition: prevState.leftPosition + 100})
      )}

    render() {
      
      return (
        <div> 
        
        <div id="divpic">
          <img id = "pic" src = {pic} alt = "pic" 
          onClick = {this.handleClick}
          style= {{left: this.state.leftPosition }} />
        </div>
        <p className="text">
        This page was generated using <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a> and React Router
        </p>
        <p className="text">
        Server-side is Node.js + Express, deployed on Heroku
        </p>
        
        </div>
      );
    }
  }
  
  export default Text;
