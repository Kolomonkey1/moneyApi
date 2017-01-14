import React from 'react';

// here we pass in the video object that comes 
// from the top level component so we can have access to it
const SymbolDetail = ({symbol}) => {
  // if video is not populated then it will should a loading message.
  if(!symbol) {
    return <div>Loading...</div>;
  }
//   console.log(symbol);

  const symbolPrice = symbol[0].symbol;
  console.log(symbolPrice);

// returns the video and information using the video object that was passed in
// iframe allows you to play the video on the page
  return (
    <div>
      <div className="details">
        <div>{symbolPrice}</div>
        <div>{symbol[0].ask_price}</div>
      </div>
    </div>
  );
};

// you export so you can have access to this component in your other files
export default SymbolDetail;