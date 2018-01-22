import React, { Component } from 'react';

import char1 from '../pic/char1.jpg';
import char2 from '../pic/char2.jpg';

class StartMenu extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      //alert('A name was submitted: ');
      var playerName = document.body.querySelectorAll('input')[0].value;
      var playerChar = (document.body.querySelectorAll('input')[1].checked)?"F":"M" 
      console.log( "Name: "      + playerName);
      console.log( "Character: " + playerChar );
      event.preventDefault();
      this.props.history.push('/play/'+playerChar+'-'+playerName);
  }
  
  render() {
      var rdm = "Player-" + Math.floor(Math.random()*2046);
      return (
          <div className = "content start">
                <form className = "startMenu" onSubmit={this.handleSubmit}>
                      <label>Name: </label>
                      <input type= "text" name= "name" id="startName" defaultValue={rdm}/>
                      
                      <div className = "playerChoiceMenu">
                        <p>Character:</p>
                        <div className="playerChoice">
                          <label>
                              <input defaultChecked="true" type="radio" name="player" value="F" />
                              <img src={char1} alt="Female character"/>
                          </label>
                          <label>
                              <input type="radio" name="player" value="M" />
                              <img src={char2} alt="Male character"/>
                          </label>
                          </div>
                      </div>
                      <input type= "submit" value= "Play !" id="startSubmit" />
                  </form> 

                  
          </div>
          );
      }
  }
  export default StartMenu;


  
 
