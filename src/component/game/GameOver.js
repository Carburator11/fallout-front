import React from 'react';

export default class GameOver extends React.Component{
    constructor(props){
        super(props);
        this.state = {    };
    }

    render(){
        return(
            <div id = "gameOver">   
                Well done !<br/>
                Score: {this.props.playerScore} <br/>
                Enemy killed: {this.props.killCount} <br/>
                Shots fired:  {this.props.shotCount} <br/>
            </div>
            );
    }

}