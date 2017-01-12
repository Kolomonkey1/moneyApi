import React, { Component } from 'react';

class Pie extends Component {
  render() {
    return (
    <div><span>You said you like {this.props.pie} pie.</span></div>
    );
  }
}


export default Pie;