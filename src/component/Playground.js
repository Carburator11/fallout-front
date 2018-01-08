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

        const blocks = this.blocks;
        // Note : I was too lazy to implement a proper pathfinding in this project, so blocks are hidden by defaul
        // Press 'o' to display blocks

        // Note 2 : first plan was to implement pathfinding
        // The function below corrects the coordinates if Player clicks within a block  

        // So-called "corrected" position will be changed ONLY if Mouse position is inside a block
        var correctedX = e.clientX;
        var correctedY = e.clientY;

        // Iterating through blocks...
        if(this.state.showBlocks){
            blocks.map((blockItem) => {
                var insideBlockX = (e.clientX >= blockItem[0]) && ( e.clientX <= ( blockItem[0]+ blockItem[2]) );
                var insideBlockY = (e.clientY >= blockItem[1]) && ( e.clientY <= ( blockItem[1]+ blockItem[3]) );
                
                // If yes, we will update correctedX and Y
                if( insideBlockX && insideBlockY)                    
                      { 
                        console.log("Inside " + blockItem[4] + " - correcting Path");

                        /* This part is a bit complex and not 100% satisfactory  
                           The function below checks the relative position of the player compared to the block.
                                                      
                                    -1-1    0-1    1-1 
                                    -1 0  |block|  1 0
                                    -1 1    0 1    1 1
                        */

                          var testX = (this.state.playerX - blockItem[0])
                              if(testX < 0)                { /* case -1 */  correctedX = blockItem[0] - 5 }
                              else if(testX > blockItem[2]){ /* case  1 */  correctedX = blockItem[0] +  blockItem[2] + 5  }
                              else                         { /* case  0 */  correctedX = blockItem[0] + (blockItem[2] / 2) }  

                          var testY = (this.state.playerY - blockItem[1])
                              if(testY < 0)                { /* case -1 */  correctedY = blockItem[1] - 5 }
                              else if(testY > blockItem[3]){ /* case  1 */  correctedY = blockItem[1] +  blockItem[3] + 5  }
                              else                         { /* case  0 */  correctedY = blockItem[1] + (blockItem[3] / 2) }  
                      }
          
                return(null);            
                })
              }
        this.setState({pathX: correctedX, pathY: correctedY, isActive: true }, 
          () => { this.checkPos() }
        )  
    }

    checkPos(){
      var diffX = this.state.pathX - this.state.playerX ;
      var diffY = this.state.pathY - this.state.playerY ;
             if( diffX === 0 && diffY > 0   ){ if(this.state.isIdle){this.move("S",   0,  1) } }
        else if( diffX === 0 && diffY < 0   ){ if(this.state.isIdle){this.move("N",   0, -1) } }
        else if( diffX > 0   && diffY === 0 ){ if(this.state.isIdle){this.move("E",   1,  0) } }
        else if( diffX < 0   && diffY === 0 ){ if(this.state.isIdle){this.move("W",  -1,  0) } }
        else if( diffX > 0   && diffY > 0   ){ if(this.state.isIdle){this.move("SE",  1,  1) } }
        else if( diffX > 0   && diffY < 0   ){ if(this.state.isIdle){this.move("NE",  1, -1) } }
        else if( diffX < 0   && diffY > 0   ){ if(this.state.isIdle){this.move("SW", -1,  1) } }
        else if( diffX < 0   && diffY < 0   ){ if(this.state.isIdle){this.move("NW", -1, -1) } }
        else if( diffX === 0 && diffY === 0 ){ 
            this.setState({playerDir: "IDLE", isIdle:true});
            console.log('IDLE');
        }
  }

  move(dir, x, y){
      var incremX = x;
      var incremY = y;
      console.log(dir);
      var that = this;

      this.setState({isIdle : false}, 
          () => {
                 setTimeout(
            () => {
              that.setState(
                prevState => (
                    { playerDir: dir,
                      playerX: prevState.playerX + incremX,
                      playerY: prevState.playerY + incremY,
                      isIdle: true }
                    ), () => { 
                          that.checkPos()
                           } );
              
              },
          1
        )}
  );
}

shoot(){
  let newArray = this.state.shot;
  let newShoot = [ this.state.playerX, this.state.playerY, "shot"+this.shotCount ];
  newArray[this.shotCount] = newShoot;
  this.setState({ shot:  newArray  }) 
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
                playerX = {this.state.playerX}
                playerY = {this.state.playerY}
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