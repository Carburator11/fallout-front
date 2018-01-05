import React from 'react';
import PlayerFrame from './PlayerFrame.js';


// Same component as PlayerPos.js but transfered the position info and methods to upper level
// These are passed to parent "Playground"component playground as these are needed for pathfinding....



export default class PlayerPosNew extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        newX: this.props.newX,
        newY: this.props.newY,};
    }

    componentWillReceiveProps(nextProps){
      
      this.setState({
          newX: nextProps.newX,
          newY: nextProps.newY
          },
          () => {
              //this.forceUpdate(); 
              //console.log("Update: " + nextProps.newX + " " + nextProps.newY +" (new)")
          }
      )  
  }

  handleClick(e){


  }


    render(){
      //console.log("new - " + this.state.newX + " " + this.state.newY);
      return (
        <div className = "playerPosNew" style = {{left : this.state.newX, top : this.state.newY }} >
          <PlayerFrame />

        </div>
      );
    }


}
