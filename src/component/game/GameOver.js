import React from 'react';



export default class GameOver extends React.Component{
    constructor(props){
        super(props);
        this.state = {    };
    }

    render(){
        return(
            
                <div id = "gameOver">
                    <div className="scores">
                        Well done !<br/>
                        Score: {this.props.playerScore} <br/>
                        Enemy killed: {this.props.killCount} <br/>
                        Shots fired:  {this.props.shotCount} <br/>
                        <div className="gameOverBtn">
                            <form action="/scores"  method="post">
                                <input type= "submit" value= "Scores"  />   
                            </form>
                            <form action="/about"  method="get">  
                                <input type= "submit" value= "About"  /> 
                            </form>
                        </div>

                    </div>
                </div>
            
            );
    }

}



  
