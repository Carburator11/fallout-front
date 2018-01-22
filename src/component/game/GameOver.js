import React from 'react';

export default class GameOver extends React.Component{
    constructor(props){
        super(props);
        this.state = {    };
    }

    render(){
        return(
            <div id = "gameOver">   
                Well done !
                Score: {this.props.playerScore}
                Enemy killed: {this.props.killCount}
                Shots fired:  {this.props.shotCount}
            </div>
            );
    }

}