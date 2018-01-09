import React from 'react';
import Path from './game/Path.js';
import PlayerPos from './game/PlayerPos.js';
import Blocks from './game/Blocks.js';
import NPC from './game/NPC.js';
import Shot from './game/Shot.js';
import Nuke from './game/Nuke.js';


class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                       pathX:   60 ,
                       pathY:   -50 ,
                       playerX:  60,
                       playerY:  100,
                       playerDir: 'IDLE',
                       isIdle: true,
                       showBlocks: false,
                       cheatMode: false,
                       shot: [],
                       enemies: [
                         [500, 150, 25, 25, "cow1"],
                         [500, 350, 25, 25, "cow2"],
                         [400, 400, 25, 25, "cow3"]]
                     };
        this.handleClick = this.handleClick.bind(this);
        this.blocks = [
                        [150, 150, 50, 80, "block1"],
                        [240, 240, 40, 40, "block2"]
                      ] ;

        
        this.shotCount = 0;
        this.check = [false, ''];
    }

    handleClick(e){ 

        if(this.state.isIdle){this.setState({pathX: e.clientX, pathY: e.clientY, isIdle: false }, () => { this.checkPos() })  }
    }

    checkPos(){
      var diffX = this.state.pathX - this.state.playerX ;
      var diffY = this.state.pathY - this.state.playerY ;
             if( diffX === 0 && diffY > 0   ){ this.move("S",   0,  1)  }
        else if( diffX === 0 && diffY < 0   ){ this.move("N",   0, -1)  }
        else if( diffX > 0   && diffY === 0 ){ this.move("E",   1,  0)  }
        else if( diffX < 0   && diffY === 0 ){ this.move("W",  -1,  0)  }
        else if( diffX > 0   && diffY > 0   ){ this.move("SE",  1,  1)  }
        else if( diffX > 0   && diffY < 0   ){ this.move("NE",  1, -1)  }
        else if( diffX < 0   && diffY > 0   ){ this.move("SW", -1,  1)  }
        else if( diffX < 0   && diffY < 0   ){ this.move("NW", -1, -1)  }
        else if( diffX === 0 && diffY === 0 ){ 
            this.setState({isIdle: true, playerDir: "IDLE"}, ()=> {console.log('isIdle: ' + this.state.isIdle  )});
   
        }
  }

move(dir, x, y){
    this.setState(
      prevState => (
          { playerDir: dir,
            playerX: prevState.playerX + x,
            playerY: prevState.playerY + y,           
          }), () => { 
              setTimeout(  () => { this.checkPos() },  1 )    
                    })

}

shoot(){
  let newArray = this.state.shot;
  let newShoot = [ this.state.playerX +30, this.state.playerY -40 , "shot"+this.shotCount ];
  newArray[this.shotCount] = newShoot;
  this.setState({ shot:  newArray, playerDir: "shoot"  }, ()=>{ setTimeout(   this.setState({ isIdle: true }) , 1000 )    }) 
  this.animateShoot(this.shotCount);
  this.shotCount++;
}

// Argument 'e' is defined by 'shotCount', it is the index of the 'shot' in this.state.shot
// Each element of this.state.shot is (also) an array containing the position of each 'shot'
checkImpact(e) {
  this.state.enemies.map((el) =>{
    var margin = 10;
    var shotOnX = ( (this.state.shot[e][0] > ( el[0] - margin) ) && ( this.state.shot[e][0] < ( el[0] + el[2] + margin  ) ) );
    var shotOnY = ( (this.state.shot[e][1] > ( el[1] - margin) ) && ( this.state.shot[e][1] < ( el[1] + el[3] + margin  ) ) );
    if(shotOnX  &&  shotOnY){
        this.check[0] = true;
        this.check[1] = this.state.enemies.indexOf(el);
    }
    return null ;
  })
}

// Argument 'e' is defined by 'shotCount', it is the index of the 'shot' in this.state.shot
// Each element of this.state.shot is an array containing the position of each 'shot'
// Deleting a 'shot' in this.state.shot deletes the 'shot' from the DOM
// Each element of this.state.enemies is an array containing the position of each 'enemy'
// Deleting an 'enemy' element in this.state.enemies deletes the 'enemy' from the DOM
animateShoot(e){
    
  setTimeout( ()=> this.setState({playerDir: 'IDLE'}), 500  );
    var intervID = setInterval(
      ()=>{
        
        //console.log('checkImpact');
        this.checkImpact(e);

        // Hardcoded playground width ! ( = 790 )
        if(this.state.shot[e][0] > 790){
            clearInterval(intervID);
            let newArray = this.state.shot;
            delete newArray[e];
            this.setState({ shot:  newArray  });
            }

        else{
            if(this.check[0]){
                // this.check[0] is set to 'true' by function checkImpact
                console.log('Target shot - ' + this.check[1]);
                clearInterval(intervID);
                let newArray = this.state.shot;
                delete newArray[e];       
                delete this.state.enemies[this.check[1]];
                this.check = [false, ''];
                this.setState({ shot:  newArray  });
                }                  

            else{
                // No collision...
                let newArray = this.state.shot;
                newArray[e][0] += 20;
                this.setState({ shot:  newArray  });
              }                   
          }
      }, 50);

}

componentDidMount() {
  
  // Easter Egg !!^^ 
  var count = 0
  var konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a" ];

  window.addEventListener("keydown", 
    (e)=> {
      // Display or Hide level blocks
      // Note : I was too lazy to implement a proper pathfinding in this project, so blocks are hidden by default
      // Pretty sure it wasn't worth it
      if(e.key === "o"){
      (this.state.showBlocks)?
            this.setState({showBlocks: false})
            :
            this.setState({showBlocks: true})
          }

      if( (e.key === " ") || (e.key === "Enter") ){
            
            this.shoot();
          }      
      
      if(e.key === konami[count]){
              console.log("cheatSequence:  " + count + " " + e.key);
              if(e.key === konami[konami.length - 1]){
                this.setState({cheatMode: true})             
                setTimeout(
                  ()=> { this.setState({cheatMode: false, enemies: []});console.log("end of nuke") }
                , 1400)  
              }
              count++;
          }
      else{ count = 0}
      
      

      });

    }



    render() {

      return (
        <div className = "playground" onClick = {this.handleClick} >
          Left 
          Click to move, 'Space' to shoot  -  {this.props.session}
          <Path 
                pathX = {this.state.pathX} 
                pathY = {this.state.pathY}

           /> 
          <PlayerPos
                playerX  = { this.state.playerX }
                playerY  = { this.state.playerY }
                action   = { this.state.playerDir }
                playerId = { this.props.sessionId }
                isIdle   = { this.state.isIdle }
             />
          
          <Blocks blocks =       { this.state.showBlocks?this.blocks:[] } />
          <NPC    npcPosition  = { this.state.enemies } />
          <Shot   shotPosition = { this.state.shot} />
          {this.state.cheatMode? <Nuke />:""}
         
        </div>
      );
    }
  }



  export default Playground;