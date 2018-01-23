import React from 'react';
import Path  from './game/Path.js';
import PlayerPos from './game/PlayerPos.js';
import Blocks    from './game/Blocks.js';
import NPC   from './game/NPC.js';
import Shot  from './game/Shot.js';
import Nuke  from './game/Nuke.js';
import Timer from './game/Timer.js';
import GameOver from './game/GameOver.js';
import bg    from '../pic/game/bg1.jpg';


class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                       pause:    false,
                       gameOver: false,
                       pathX:    60 ,
                       pathY:   -50 ,
                       playerX:  60,
                       playerY:  200,
                       playerDir: 'IDLE',
                       isIdle:     true,
                       showBlocks: false,
                       cheatMode:  false,
                       shot: [],
                       timeLeft:  10,

                       enemies: [
                         // X position (css left), Y position (css top), Width, Heigth, id/key, status, spriteX, spriteY
                         // this should also be an object...  :/
                         // These three enemies aren't counted in cowCount below
                         [500, 150, 50, 50, "cow1", "alive", 0, 0],
                         [500, 350, 50, 50, "cow2", "alive", 0, 0],
                         [400, 400, 50, 50, "cow3", "alive", 0, 0]]
                     };
        this.handleClick = this.handleClick.bind(this);

        // Not used in the final version
        this.blocks = [
                        [150, 150, 50, 80, "block1"],
                        [240, 240, 40, 40, "block2"]
                      ] ;
        // Shot fired
        this.shotCount   = 0;
        // Enemy killed
        this.killCount   = 0;
        // Score
        this.playerScore = 0;
        
        // the status (did it shoot an enemy and which) of each bullet used to be stored in 'check' Array.
        // Replaced by the 'shoostatus' object
        // this.check = [false, ''];
        this.shootStatus = {
            anEnemyHasBeenShot: false,
            indexOfEnemyShot: ''
        }

    }

handleClick(e){
    if( this.state.isIdle && !this.state.pause ){
      this.setState({pathX: e.clientX, pathY: e.clientY, isIdle: false }, () => { this.checkPos() })
    }
      
}



startAnimation(callback) {
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback();
    });
  });
}

pause(){
    console.log('PAUSE');
    this.setState({
      pause: true,
      isIdle: true
    });
}

gameOver(){
  console.log('GAME OVER');
  this.setState({
    pause: true,
    isIdle: true,
    gameOver: true
  });  

}

checkPos(){
    if(!this.state.pause){  
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
              this.setState({ isIdle: true });
          }
      }

  }


move(dir, x, y){
    if(!this.state.pause){
        this.setState(
          prevState => (
              { playerDir: dir,
                playerX: prevState.playerX + x,
                playerY: prevState.playerY + y,           
              }), () => { 
                  window.requestAnimationFrame(  () => { this.checkPos() } )    
                        })

    }
}

shoot(){
    if(!this.state.pause){
        let newArray = this.state.shot;
        let newShoot = [ this.state.playerX +30, this.state.playerY -40 , "shot"+this.shotCount ];
        newArray[this.shotCount] = newShoot;
        this.setState({ shot:  newArray }, ()=>{ setTimeout(   this.setState({ isIdle: true }) , 1000 )    }) 
        this.animateShoot(this.shotCount);
        this.shotCount++;
    } 

}

// Argument 'e' is defined by 'shotCount', it is the index of the 'shot' in this.state.shot
// Each element of this.state.shot is (also) an array containing the position of each 'shot'
checkImpact(e) {
    this.state.enemies.forEach((el) =>{
        var margin = 10;
        var shotOnX = ( (this.state.shot[e][0] > ( el[0] - margin) ) && ( this.state.shot[e][0] < ( el[0] + el[2] + margin  ) ) );
        var shotOnY = ( (this.state.shot[e][1] > ( el[1] - margin) ) && ( this.state.shot[e][1] < ( el[1] + el[3] + margin  ) ) );
        if(shotOnX  &&  shotOnY){
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
            this.checkImpact(e);
            
            // CASE : shot out of playground  (hardcoded playground width = 790 ! )
            if(this.state.shot[e][0] > 790){
                clearInterval(intervID);
                let newArray = this.state.shot;
                delete newArray[e];
                this.setState({ shot:  newArray  });
                }

            else{

                // CASE : an enemy is shot
                if(this.shootStatus.anEnemyHasBeenShot){
                    clearInterval(intervID);
                    let newArray = this.state.shot;
                    delete newArray[e];
                    // This will launch the animation 'enemyShot'
                    this.enemyShot(this.shootStatus.indexOfEnemyShot);
                    this.shootStatus = {
                        anEnemyHasBeenShot: false,
                        indexOfEnemyShot: ''}

                    this.setState({ shot:  newArray  });
                    }                  

                else{
                    // CASE : no collision, the shot keeps moving...
                    let newArray = this.state.shot;
                    newArray[e][0] += 20;
                    this.setState({ shot:  newArray  });
                  }                    
            }
    }, 50);

}

// Triggers an animation of the enemy at index [e]
// Animation starts only if the enemy has the status 'alive' 
enemyShot(e){
    if(this.state.enemies[e][5] === "alive"){
        let newArray = this.state.enemies;
        newArray[e][5] = "shot";
        // There are two different animations for each "M" and "F" character, each one on a different Sprite row
        if((this.props.session.substr(0, 1) === "M" )){
            newArray[e][7] =  -100;
        } else{
            newArray[e][7] =  -200;
        }      
        this.setState({enemies: newArray}, ()=>{ 
            console.log(this.state.enemies[e][4] + ' - ' + this.state.enemies[e][5]);
            this.killCount++;
            this.playerScore += 15;
            console.log(this.props.session + " :" +  this.playerScore + " pts (kills: "  +  this.killCount  + ", shots: " + this.shotCount  +")" );

            // Animation 'enemyDie' will loop 10 times starting from 0
            this.enemyDie(e, 0);  
            
            // At the end of the animation, the enemy at index [e] is removed from the enemy array
            setTimeout(
                ()=>{
                  console.log(this.state.enemies[e][4] + " killed." );
                  let newArray = this.state.enemies; 
                  delete newArray[e];
                  this.setState({ enemies:  newArray  });
                  this.spawnEnemy();               
                }   , 1800)
        });  
    } 
}

// The animation triggered by "EnemyShot" will lopp 10 times
enemyDie(e, count){
    if(count<10){
        count++;
        var newEnemies = this.state.enemies ;
        // Updating sprite left position on each loop
        newEnemies[e][6] =  newEnemies[e][6] - 150 ;

        // Animation will loop with a 150ms delay
        this.setState( { enemies: newEnemies  } , ()=> {
            setTimeout( ()=> {this.enemyDie(e, count)} , 150);
        })   
    } 
}

spawnEnemy(){
  // Enemy status (this SHOULD be an object !! ) is stored in an array [0-7] :
  // [X position (css left), Y position (css top), Width, Heigth, name/id/key, status, spriteX, spriteY ]
  let randomX  =  200 + (( Math.random() * 10 ) * 20  )  ;  
  let randomY  =  100 + (( Math.random() * 10 ) * 30 )  ;
  let newName  =  'cow' + (this.state.enemies.length + 1);
  let newEnemy =  [randomX, randomY, 50, 50, newName, 'alive', 0, 0];
  let newEnemyArray = this.state.enemies ;
  newEnemyArray.push(newEnemy);
  this.cowCount++;
  this.setState({ enemies: newEnemyArray  });
}

// Timer till the "Game over"
decrTimeLeft(){
  if(!this.state.pause){
      if(this.state.timeLeft > 0){
        setTimeout(
            ()=>{ 
              this.setState( 
                  prevState => ({
                    timeLeft: (prevState.timeLeft - 1)
                  }),
                    ()=>{
                        this.decrTimeLeft()
                        })
        } , 1000 )
      } 

      else{
          // Game over !
          this.gameOver();


      }
  } else {
    setTimeout(  ()=> {this.decrTimeLeft() }, 1000);
  }
}

bonusTime(){
  if(this.statekillCount > 0){

      if(this.statekillCount % 5 ){
        console.log("Bonus time + 5s");
        this.setState( (prevState)=> ({ timeLeft: prevState.timeLeft + 3 }))
      }



    }
}



componentDidMount() {
  
  this.decrTimeLeft()

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
      
      if( e.key === "p" ){
          if(this.state.pause){
              this.setState( { pause: false });
          }
          else{
              if(!this.state.gameOver){
                this.pause();
              }
          }        
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
                  ()=> { this.setState({cheatMode: false, enemies: []}); }
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
           
          Click to move, 'Space' to shoot  {this.props.session}
          
          <Timer time= {this.state.timeLeft} />
          {this.state.gameOver? <GameOver
              playerScore = {this.playerScore}
              killCount   = {this.killCount}
              shotCount   = {this.shotCount}
          />:""}  
          <Path 
                pathX = {this.state.pathX} 
                pathY = {this.state.pathY}

           />
          <PlayerPos
                playerX  = { this.state.playerX }
                playerY  = { this.state.playerY }
                dir   =    { this.state.playerDir }
                playerId = { this.props.session }
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