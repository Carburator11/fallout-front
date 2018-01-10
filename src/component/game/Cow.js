import React from 'react';
import spriteCow from '../../pic/game/spriteCow.png' ;


export default class Cow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            spriteX: this.props.spriteX,
            spriteY: this.props.spriteY
        };

    }
    componentWillReceiveProps(nextProps){
      
        this.setState({
            spriteX: nextProps.spriteX,
            spriteY: nextProps.spriteY
            })  
    }
    render(){
        return(
            <div className= "cowDiv">   
            <img style= {{  left: this.state.spriteX,
                            top:  this.state.spriteY,
                            }}
                src={spriteCow}
                id="cowSprite"
                alt="Enemy (Brahmin cow)" />    
            </div>
            );
    }

}

