import React, { Component } from 'react';

class Admin extends Component {
  render() {
    return (
      <div> 
        <p>What is your favorite type of pie?</p>
        	<button type='button' onClick={()=>this.props.onClick('Pecan')} >Pecan</button>
        	<button type='button' onClick={()=>this.props.onClick('Apple')}>Apple</button>
        	<button type='button' onClick={()=>this.props.onClick('Blueberry')}>Blueberry</button>
          <button type='button' onClick={()=>this.props.onClick('Cookie Cream')} >Cookie Cream</button>
          <button type='button' onClick={()=>this.props.onClick('Corned Beef')}>Corned Beef</button>
          <button type='button' onClick={()=>this.props.onClick('Shepherds')}>Shepherds</button>
      </div>
    );
  }
}


export default Admin;