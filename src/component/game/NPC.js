import React from 'react';

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
    </div>
    );

return( <div>{npc}</div> )

};