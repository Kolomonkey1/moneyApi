import React from 'react';

// here we pass in the video object that comes 
// from the top level component so we can have access to it
const SymbolDetail = ({symbol}) => {
  // if video is not populated then it will should a loading message.
  if(!symbol) {
    return <div>Loading...</div>;
  }
 

// returns the video and information using the video object that was passed in
// iframe allows you to play the video on the page
  return (
    <div>
      <div className="details">
      Valid entries example single = msft example multiple = msft,pola,cvs
      can not have spaces needs coma in between
      
        <div>
          {symbol.map(function(stock){
            return (
              <div key={stock.symbol}>
              <ul>
                <li>Symbol Name: {stock.symbol}</li>
                <li>Adjusted Previous Close: {stock.adjusted_previous_close}</li>
                <li>Ask Price: {stock.ask_price}</li>
                <li>Ask Size: {stock.ask_size}</li>
                <li>Bid Price: {stock.bid_price}</li>
                <li>Bid Size: {stock.bid_size}</li>
                <li>Instrument: {stock.instrument}</li>
                <li>Last extended Hours Trade Price: {stock.last_extended_hours_trade_price}</li>
                <li>Last Trade Price: {stock.last_trade_price}</li>
                <li>Last Trade Price Source: {stock.last_trade_price_source}</li>
                <li>Previous Close: {stock.previous_close}</li>
                <li>Previous Close Date: {stock.previous_close_date}</li>
                <li>Updated At: {stock.updated_at}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// you export so you can have access to this component in your other files
export default SymbolDetail;