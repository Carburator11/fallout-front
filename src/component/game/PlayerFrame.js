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
      this.delay = 100;
      this.dir = { "E":  0,  "W": -70,  "N":  -140, "NE":  -140, "S": -210, "SE": -210,  "SW" : -280, "NW": -350,  "IDLE-E" : -420, "Shoot": -490  };
      
    }
    


componentWillReceiveProps(nextProps){
      if( this.state.isIdle === true){
          this.setState( {leftStripe: 0 })
          }
                      
      if( this.state.action !== nextProps.action ){                   
          this.setState({
              action: nextProps.action,
              topSprite : this.dir[nextProps.action],

              },  () => {
                      this.animate(); 
                        })
          }
      
  }


animate(){
    
      var newLeft = (this.state.leftStripe <= -540) ? 0 : (this.state.leftStripe - 60);  
      this.setState( { 
          leftStripe: newLeft }, () => {
              console.log('Animate: ' + this.state.action + '  ' + this.state.topStripe + '  '  + this.state.leftStripe);   
              setTimeout( () => {
                                this.animate()
                                }, this.delay  );             
                    });
      
                
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