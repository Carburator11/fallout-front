// Initial component owned 'move' and 'checkPos' methods
// methods were lifted up to component "Playground' to handle collisions and pathfinding  issues


import React from 'react';
import PlayerFrame from './PlayerFrame.js';

class PlayerPos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          coordX: 100,
          coordY: 100,
          pathX: 0,
          pathY: 0,
          isActive: false,
          direction: "IDLE" };

        this.checkPos.bind(this);
        this.move.bind(this);
    }

    componentWillReceiveProps(nextProps){
        //console.log("New props received " + nextProps.pathX + " " + nextProps.pathY );
        this.setState({
            pathX: nextProps.pathX,
            pathY : nextProps.pathY
            },
        () => this.checkPos()
        )  
    }


    checkPos(){
        var diffX = this.state.pathX - this.state.coordX ;
        var diffY = this.state.pathY - this.state.coordY ;
        //console.log("checkPos: " + this.props.pathX +" " + this.state.coordX)
        //console.log("checkPos dX: " + diffX);
               if( diffX === 0 && diffY > 0   ){ if(!this.state.isActive){this.move("S",   0,  1) } }
          else if( diffX === 0 && diffY < 0   ){ if(!this.state.isActive){this.move("N",   0, -1) } }
          else if( diffX > 0   && diffY === 0 ){ if(!this.state.isActive){this.move("E",   1,  0) } }
          else if( diffX < 0   && diffY === 0 ){ if(!this.state.isActive){this.move("W",  -1,  0) } }
          else if( diffX > 0   && diffY > 0   ){ if(!this.state.isActive){this.move("SE",  1,  1) } }
          else if( diffX > 0   && diffY < 0   ){ if(!this.state.isActive){this.move("NE",  1, -1) } }
          else if( diffX < 0   && diffY > 0   ){ if(!this.state.isActive){this.move("SW", -1,  1) } }
          else if( diffX < 0   && diffY < 0   ){ if(!this.state.isActive){this.move("NW", -1, -1) } }
          else if( diffX === 0 && diffY === 0 ){ 
              this.setState({direction: "IDLE"});
              //console.log('IDLE');
              this.setState({active:false});
          }
    }

    move(dir, incremX, incremY){
        var that = this;

        this.setState({isActive : true}, 
            ()=> setTimeout(function(){
                //console.log(dir);
                that.setState(
                  prevState =>(
                    { direction: dir,
                      coordX: prevState.coordX + incremX,
                      coordY: prevState.coordY + incremY,
                      isActive: false }
                  ), () => {  that.checkPos()} );
                
                },
            10
          )
    );
  }
  


    render() {
      return (
        <div className = "playerPos" style = {{left : this.state.coordX, top : this.state.coordY}} >
          <PlayerFrame />
        </div>
      );
    }
  }



  export default PlayerPos;