import React from 'react';
import PlayerFrame from './PlayerFrame.js';

export default class PlayerPos extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        playerX: this.props.playerX,
        playerY: this.props.playerY}
    }

    componentWillReceiveProps(nextProps){
      
      this.setState({
          playerX: nextProps.playerX,
          playerY: nextProps.playerY
          })  
  }

  handleClick(e){


  }


    render(){
      
      return (
        <div className = "playerPos" style = {{left : this.state.playerX, top : this.state.playerY }} >
          <PlayerFrame 
              dir   = { this.props.dir }
              playerId = { this.props.playerId }
              isIdle   = { this.props.isIdle }
           />

        </div>
      );
    }


}
