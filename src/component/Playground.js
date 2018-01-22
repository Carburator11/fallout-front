import React from 'react';
import Path  from './game/Path.js';
import PlayerPos from './game/PlayerPos.js';
import Blocks    from './game/Blocks.js';
import NPC  from './game/NPC.js';
import Shot from './game/Shot.js';
import Nuke from './game/Nuke.js';
import bg   from '../pic/game/bg1.jpg';

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                       pathX:    60 ,
                       pathY:   -50 ,
                       playerX:  60,
                       playerY:  200,
                       playerDir: 'IDLE',
                       isIdle:     true,
                       showBlocks: false,
                       cheatMode:  false,
                       shot: [],
                       enemies: [
                         [500, 150, 50, 50, "cow1", "alive", 0, 0],
                         [500, 350, 50, 50, "cow2", "alive", 0, 0],
                         [400, 400, 50, 50, "cow3", "alive", 0, 0]]
                     };
        this.handleClick = this.handleClick.bind(this);
        this.blocks = [
                        [150, 150, 50, 80, "block1"],
                        [240, 240, 40, 40, "block2"]
                      ] ;

        
        this.shotCount = 0;
        //this.check = [false, ''];
        this.shootStatus = {
          anEnemyHasBeenShot: false,
          indexOfEnemyShot: ''
        }

    }

handleClick(e){ 
        if(this.state.isIdle){this.setState({pathX: e.clientX, pathY: e.clientY, isIdle: false }, () => { this.checkPos() })  }
    }

// Pathfiding 
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
            this.setState({ isIdle: true }, ()=> {console.log('isIdle: ' + this.state.isIdle  )});
   
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
  this.state.enemies.forEach((el) =>{
    var margin = 10;
    var shotOnX = ( (this.state.shot[e][0] > ( el[0] - margin) ) && ( this.state.shot[e][0] < ( el[0] + el[2] + margin  ) ) );
    var shotOnY = ( (this.state.shot[e][1] > ( el[1] - margin) ) && ( this.state.shot[e][1] < ( el[1] + el[3] + margin  ) ) );
    if(shotOnX  &&  shotOnY){
        //this.check[0] = true;
        //this.check[1] = this.state.enemies.indexOf(el);
        this.shootStatus = {
          anEnemyHasBeenShot: true,
          indexOfEnemyShot: this.state.enemies.indexOf(el)
        }
    }
    
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
        
        // Check if the shot is outside the playground
        // Hardcoded playground width ! ( = 790 )
        if(this.state.shot[e][0] > 790){
            clearInterval(intervID);
            let newArray = this.state.shot;
            delete newArray[e];
            this.setState({ shot:  newArray  });
            }

        else{
            //if(this.check[0]){
            if(this.shootStatus.anEnemyHasBeenShot){
                // this.check[0] is set to 'true' by function checkImpact
                // this.check[1] is the index of the Enemy in this.state.enemies
                clearInterval(intervID);
                let newArray = this.state.shot;
                delete newArray[e];

                //this.enemyShot(this.check[1]);
                this.enemyShot(this.shootStatus.indexOfEnemyShot);
                //this.check = [false, ''];
                this.shootStatus = {
                  anEnemyHasBeenShot: false,
                  indexOfEnemyShot: ''
                }
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

enemyDie(e, count){
  if(count<10){
    count++;
    //console.log(count +  " PLAYER:  " + this.props.sessionId.substr(0, 1)  );
    var newEnemies = this.state.enemies ;
    newEnemies[e][6] =  newEnemies[e][6] - 150 ;
    if((this.props.sessionId.substr(0, 1) === "M" )){
      newEnemies[e][7] =  -100
    } else{
      newEnemies[e][7] =  -200
    }

    this.setState( { enemies: newEnemies  } , ()=> {
      setTimeout( ()=> {this.enemyDie(e, count)} , 150);
    })
    
  }
}

spawnEnemy(){
  


}

enemyShot(e){
    // IF = you can ONLY shot 'alive' enemies 
    if(this.state.enemies[e][5] === "alive"){
        let newArray = this.state.enemies;
        newArray[e][5] = "shot";
        this.setState({enemies: newArray}, ()=>{ 
                console.log(this.state.enemies[e][4] + ' - ' + this.state.enemies[e][5]);
                this.enemyDie(e, 0);  
                
                setTimeout(
                  ()=>{
                    console.log(this.state.enemies[e][4] + " killed." );
                    let newArray = this.state.enemies; 
                    delete newArray[e];
                    this.setState({ enemies:  newArray  });
                    
                    
                  }   , 1800)

        });
        
          




        
    } 
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
                this.state.enemies.forEach((el)=>{
                  this.enemyDie(this.state.enemies.indexOf(el), 0)
                  } 
                )
                

                setTimeout(
                  ()=> { this.setState({cheatMode: false, enemies: []});console.log("end of nuke") }
                , 1800)  
              }
              count++;
          }
      else{ count = 0}
      
      

      });

    }



    render() {

      return (
        <div className = "playground" onClick = {this.handleClick} style={{ backgroundImage: "url(" + bg + ")" }}>
           
          Click to move, 'Space' to shoot  -  {this.props.session}
          
          
          <Path 
                pathX = {this.state.pathX} 
                pathY = {this.state.pathY}

           /> 
          <PlayerPos
                playerX  = { this.state.playerX }
                playerY  = { this.state.playerY }
                dir   =    { this.state.playerDir }
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