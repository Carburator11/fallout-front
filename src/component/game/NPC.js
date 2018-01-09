
// This compoenent is mostly for enemies...
// It was called NPC at the beginning of the project for "Non-Playing Character"
// Its properties come from Playgroung compoent {this.state.enemies}
// This component should be (or will be) renamed Enemies instead of NPC.js

import React from 'react';
import Cow from './Cow.js';

export default function NPC(props){ 

    const npc = props.npcPosition.map((el) =>
    <div style= {{ 
        left: el[0],
        top: el[1],
        width: el[2], 
        height: el[3]
        }}  className= "npc"
            id = { el[4]}
            key= { el[4]} >
    <Cow />
    </div>
    );

return( <div>{npc}</div> )

};