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
        <div>
        <ul>
            <li>Symbol Name: {symbol[0].symbol}</li>
            <li>Adjusted Previous Close: {symbol[0].adjusted_previous_close}</li>
            <li>Ask Price: {symbol[0].ask_price}</li>
            <li>Ask Size: {symbol[0].ask_size}</li>
            <li>Bid Price: {symbol[0].bid_price}</li>
            <li>Bid Size: {symbol[0].bid_size}</li>
            <li>Instrument: {symbol[0].instrument}</li>
            <li>Last extended Hours Trade Price: {symbol[0].last_extended_hours_trade_price}</li>
            <li>Last Trade Price: {symbol[0].last_trade_price}</li>
            <li>Last Trade Price Source: {symbol[0].last_trade_price_source}</li>
            <li>Previous Close: {symbol[0].previous_close}</li>
            <li>Previous Close Date: {symbol[0].previous_close_date}</li>
            <li>Updated At: {symbol[0].updated_at}</li>
        </ul>
        </div>
      </div>
    </div>
  );
};

// you export so you can have access to this component in your other files
export default SymbolDetail;