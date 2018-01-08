import React from 'react';

export default function Shot(props){ 

    const shot = props.shotPosition.map((el) =>
    <div style= {{ 
        left: el[0],
        top: el[1],
        width: 3, 
        height: 3
        }}  className= "shot"
            id = { el[2]}
            key= { el[2]} >
    </div>
    );

return( <div>{shot}</div> )

};