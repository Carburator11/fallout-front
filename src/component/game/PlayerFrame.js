import React from 'react';
import spriteF from '../../pic/game/spriteF.png' ;
import spriteM from '../../pic/game/spriteM.png';
var currentDir;



class PlayerFrame extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        action: "IDLE",
        topSprite : -420,
        leftStripe: 0,
        spriteImg: '',
      };

      this.count = 0;
      this.dir = { "E":  0,  "W": -70,  "N":  -140, "NE":  -140, "S": -210, "SE": -210,  "SW" : -280, "NW": -350,  "IDLE" : -420, "Shoot": -490  };
    }
    

animate(){
      
      var newLeft = (this.state.leftStripe <= -540) ? 0 : (this.state.leftStripe - 60);
      this.setState( { 
        leftStripe: newLeft },
          () => {
              console.log('Animate: ' + this.state.action + '  ' + this.state.topStripe + '  '  + this.state.leftStripe);
              setTimeout( () => { this.animate() }, 300  );             
                      }
                   );
  }



componentWillReceiveProps(nextProps){
      var newAction = nextProps.action
      this.setState({
          action: newAction,
          topSprite : this.dir[newAction]
          
              },
                  () => {
                    
                    if(this.state.action !== currentDir){
                        this.count = 0;
                        this.animate();
                        console.log(this.state.action );
                        currentDir = this.state.action ;
                    }
                  })
  }



    render() {
      var  spriteImg=  ( ( (this.props.playerId).substr(0,1) === "M" )? spriteM : spriteF) ;
      return (
        <div className = "playerFrame">
          <img 
              src = {spriteImg} 
              alt = "player Sprite" 
              id  = "imgSprite" 
              style = {{
                  top: this.state.topSprite,
                  left: this.state.leftStripe
                   }}
          />
        </div>
      );
    }
  }



  export default PlayerFrame;