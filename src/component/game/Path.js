import React from 'react';



class Path extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {      
      return  <div className = "path" style = {{left : this.props.pathX, top : this.props.pathY}}></div>
    }
  }



  export default Path;