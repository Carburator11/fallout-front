import React from 'react';
import spriteF from '../../pic/game/spriteF.png' ;
import spriteM from '../../pic/game/spriteM.png';


class PlayerFrame extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dir: this.props.dir,
        topSprite : -420,
        leftStripe: 0,
        spriteImg: '',
        isIdle: this.props.isIdle
      };
      this.delay = 200;
      this.dir = { "E":  0,  "W": -70,  "N":  -140, "NE":  -140, "S": -210, "SE": -210,  "SW" : -280, "NW": -350,  "none" : -420, "Shoot": -490  };
      this.ongoingAnimation = false;
    }
    


componentWillReceiveProps(nextProps){
      if( nextProps.isIdle === true){
          this.setState( {
              leftStripe: 0, 
              isIdle: nextProps.isIdle
              });
          this.ongoingAnimation = false; 
          }
      else{                              
          this.setState({
              topSprite: this.dir[nextProps.dir],
              isIdle:    nextProps.isIdle,
              dir:       nextProps.dir
              },  () => {
                      if( !this.ongoingAnimation ){this.animate() } 
                        })
      }
  }


animate(){    
      if(!this.state.isIdle){
          this.ongoingAnimation = true; 
          var newLeft = (this.state.leftStripe <= -540) ? 0 : (this.state.leftStripe - 60);  
          this.setState( { 
              leftStripe: newLeft }, () => {
                    setTimeout( () => {
                          this.animate()
                                }, this.delay  );             
          }); 
      }         
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