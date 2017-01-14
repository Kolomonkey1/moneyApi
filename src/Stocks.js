import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class Stocks extends Component {


  render() {
    console.log("Props.Stock - ", this.props.Stocks);
    if(this.props.Stocks === undefined){
      return (
        // <div>
        //   // <div>Working</div>
        //   <div>Name: {this.props.state.Name}</div>
        //   <div>LTP: {this.props.state.LastTradePrice}</div>
        // </div>
        <div>
          LOADING
        </div>

      );
    }else {
      return (
        <div>
          {this.props.Stocks.map(function(stock){
            return (
              <div key={stock.symbol}>
                {stock.symbol}
                price: {stock.last_trade_price}
              </div>
            );
          })}
        </div>
      )
    }
    }
  }

export default Stocks;
