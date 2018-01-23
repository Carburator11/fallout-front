import React, { Component } from 'react';
import about from '../pic/about.jpg';


  


class About extends Component {
    render() {
      return (
        <div className = "content">
                <p>About...</p>
                <img src={about} alt ="about me" title ="about me" style = {{width: 350}}/>
                
                


        </div>
      );
    }
  }
  export default About;


  
 
