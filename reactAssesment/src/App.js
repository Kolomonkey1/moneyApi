import React, { Component } from 'react';
import Header from './Header';
import Admin from './Admin';
import Reset from './Reset';

class App extends Component {
  constructor(){
    super();
    this.state = {
      show: false
    }
  }
  changePie(newPie){
    this.setState({
      pie: newPie,
      show: true
    })
  }

  reset(newStatus){
    this.setState({
      show: newStatus
    })
  }

  render() {
    if (this.state.show === true){
      return (
      <div className="App">
      <Header pie={this.state.pie}/>
      <Reset onClick={(newStatus) =>this.reset(newStatus)}/>
      </div>
    );
    } else {
      return (
        <Admin onClick={(newPie) =>this.changePie(newPie) }/>
        );
    }

  }
}


export default App;