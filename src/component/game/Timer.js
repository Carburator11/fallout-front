import React from 'react';


export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {    };
    }

    render(){
        return(
            <div id = "timer">
                Timer: {this.props.time}
                
               
            </div>
            );
    }

}