import React, { Component } from 'react';

class Reset extends Component {
  render() {
    return (
      <div> 
        	<button type='button' onClick={()=>this.props.onClick('false')} >Reset</button>
      </div>
    );
  }
}


export default Reset;