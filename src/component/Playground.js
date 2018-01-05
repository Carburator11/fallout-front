import React from 'react';
import Path from './game/Path.js';
import PlayerPosNew from './game/PlayerPosNew.js';
import Blocks from './game/Blocks.js';


class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
                       pathX:   30,
                       pathY:  170,
                       newX:  250,
                       newY:  340,
                       newDir: 'IDLE',
                       isIdle: true,
                     };
        this.handleClick = this.handleClick.bind(this);
        this.blocks = [
                        [150, 150, 50, 80, "block1"],
                        [240, 240, 40, 40, "block2"]
                      ] ;
        //blocks : [Xposition (css prop: left), Yposition (css prop: top), (css prop: width), (css prop: height), name (Id and Key)]
    }

    handleClick(e){

        const blocks = this.blocks;

        // Mouse position (e.clientX, e.clientY) will be assigned to Path 
        // Path position will be changed ONLY if Mouse position is inside a block
        var correctedX = e.clientX;
        var correctedY = e.clientY;

        // We check in each block if Mouse position is inside a Block
        blocks.map((blockItem) => {
            var insideBlockX = (e.clientX >= blockItem[0]) && ( e.clientX <= ( blockItem[0]+ blockItem[2]) );
            var insideBlockY = (e.clientY >= blockItem[1]) && ( e.clientY <= ( blockItem[1]+ blockItem[3]) );
            
            // If yes, we will update correctedX and Y
            if( insideBlockX && insideBlockY)                    
                  { 
                    console.log("Inside " + blockItem[4] + " - correcting Path");

                    /*  The function below checks the relative position of the player compared to the block     
                                -1-1    0-1    1-1 
                                -1 0  |block|  1 0
                                -1 1    0 1    1 1
                    */

                      var testX = (this.state.newX - blockItem[0])
                          if(testX < 0)                { /* case -1 */  correctedX = blockItem[0] - 5 }
                          else if(testX > blockItem[2]){ /* case  1 */  correctedX = blockItem[0] +  blockItem[2] + 5  }
                          else                         { /* case  0 */  correctedX = blockItem[0] + (blockItem[2] / 2) }  

                      var testY = (this.state.newY - blockItem[1])
                          if(testY < 0)                { /* case -1 */  correctedY = blockItem[1] - 5 }
                          else if(testY > blockItem[3]){ /* case  1 */  correctedY = blockItem[1] +  blockItem[3] + 5  }
                          else                         { /* case  0 */  correctedY = blockItem[1] + (blockItem[3] / 2) }  
                   }
       
            return(null);            
            })
        
        this.setState({pathX: correctedX, pathY: correctedY, isActive: true }, 
          () => { this.checkPos() }
        )  
    }

    checkPos(){
      var diffX = this.state.pathX - this.state.newX ;
      var diffY = this.state.pathY - this.state.newY ;
      //console.log("Diff - "+ diffX + ' '+ diffY)
             if( diffX === 0 && diffY > 0   ){ if(this.state.isIdle){this.move("S",   0,  1) } }
        else if( diffX === 0 && diffY < 0   ){ if(this.state.isIdle){this.move("N",   0, -1) } }
        else if( diffX > 0   && diffY === 0 ){ if(this.state.isIdle){this.move("E",   1,  0) } }
        else if( diffX < 0   && diffY === 0 ){ if(this.state.isIdle){this.move("W",  -1,  0) } }
        else if( diffX > 0   && diffY > 0   ){ if(this.state.isIdle){this.move("SE",  1,  1) } }
        else if( diffX > 0   && diffY < 0   ){ if(this.state.isIdle){this.move("NE",  1, -1) } }
        else if( diffX < 0   && diffY > 0   ){ if(this.state.isIdle){this.move("SW", -1,  1) } }
        else if( diffX < 0   && diffY < 0   ){ if(this.state.isIdle){this.move("NW", -1, -1) } }
        else if( diffX === 0 && diffY === 0 ){ 
            this.setState({newDir: "IDLE", isIdle:true});
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
                    { newDir: dir,
                      newX: prevState.newX + incremX,
                      newY: prevState.newY + incremY,
                      isIdle: true }
                    ), () => { 
                          that.checkPos()
                           } );
              
              },
          1
        )}
  );
}







    render() {

      return (
        <div className = "playground" onClick = {this.handleClick} >
          Click to move -{this.props.session}
          <Path 
                pathX = {this.state.pathX} 
                pathY = {this.state.pathY}

           /> 
          <PlayerPosNew 
                newX = {this.state.newX}
                newY = {this.state.newY}
             />
        <Blocks blocks = { this.blocks } />
        </div>
      );
    }
  }



  export default Playground;