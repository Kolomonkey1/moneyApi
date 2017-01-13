import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class Stocks extends Component {


  render() {
    console.log("Props.Stock - ", this.props.Stocks);
      return (
        // <div>
        //   // <div>Working</div>
        //   <div>Name: {this.props.state.Name}</div>
        //   <div>LTP: {this.props.state.LastTradePrice}</div>
        // </div>
        <div>
          //neeed to loop through this.props.Stock for individual stocks
        </div>

      );
    }
  }

export default Stocks;
