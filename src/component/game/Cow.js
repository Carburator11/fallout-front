import React from 'react';
import spriteCow from '../../pic/game/spriteCow.png' ;


export default function Cow(props){ 

return(
    <div className= "cowDiv">
    <img style= {{ top: 0, left: 0 }} src={spriteCow} id="cowSprite" />
    </div>    );


};