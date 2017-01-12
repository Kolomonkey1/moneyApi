import React, { Component } from 'react';
import Pie from './Pie';

class Header extends Component {
  render() {
    return (
      <header> 
       <Pie pie={this.props.pie} /> 
      </header>
    );
  }
}


export default Header;