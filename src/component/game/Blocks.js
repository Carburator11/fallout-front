import React from 'react';

export default function Blocks(props){ 

    const blocks = props.blocks.map((el) =>
        <div style= {{ 
            left: el[0],
            top: el[1],
            width: el[2], 
            height: el[3]
            }}  className= "block"
                id = { el[4]}
                key= { el[4]} >
        </div>
    );

    return( <div>{blocks}</div> )

};