import React, { Component } from 'react';
import Playground from './Playground.js';
import "../css/game.css";

class Play extends Component {
  
  render() {
    

    return (
      <div className="play">
          <Playground sessionId = {this.props.match.params.sessionId} />  
      </div>
    );
  }
}



export default Play;
