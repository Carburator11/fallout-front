import React from 'react';
import PlayerFrame from './PlayerFrame.js';


// Same component as PlayerPos.js but transfered the position info and methods to upper level
// These are passed to parent "Playground"component playground as these are needed for pathfinding....



export default class PlayerPos extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        playerX: this.props.playerX,
        playerY: this.props.playerY,};

    }

    componentWillReceiveProps(nextProps){
      
      this.setState({
          playerX: nextProps.playerX,
          playerY: nextProps.playerY
          },
          () => {
              //this.forceUpdate(); 
              //console.log("Update: " + nextProps.playerX + " " + nextProps.playerY +" (player)")
          }
      )  
  }

  handleClick(e){


  }


    render(){
      
      return (
        <div className = "playerPos" style = {{left : this.state.playerX, top : this.state.playerY }} >
          <PlayerFrame 
              action   = { this.props.action }
              playerId = { this.props.playerId }
              isIdle   = { this.props.isIdle }
           />

        </div>
      );
    }


}
