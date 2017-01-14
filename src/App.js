// imports all the files you will be using
// when you use a libary you do not have to specify the path
// when using a file you created you do have to specify the path
import _ from 'lodash';
import React, { Component } from 'react';
import SearchBar from './search_bar';
import SymbolDetail from './symbol_detail';


// this is the top level component to which we will be passing in all the other components
class App extends Component {
// the constructor will be recognized by react and will run first
// here we are setting the initial state
  constructor(props) {
    super(props);

    this.state = { 
   };
// changing the passed in param here will set the inital search for the videos   
   this.symbolSearch('MSFT');
  }
// this function uses YTSearch from imports
// to make the api call for the videos
  symbolSearch(term) {
    const url = `https://api.robinhood.com/quotes/?symbols=${term}&token=9e69c3b5306b5653ae1da50ac07dc2a42e9793ea`;
    const myHeaders = new Headers();
    const myInit = { method: 'GET',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    fetch(url, myInit).then(
      (response) => {
         console.log('RESPONSE: ', response);
        return response.json();
      })
    .then((json) => {
      console.log("json - ", json.results);
      this.setState({
        Stocks: json.results,
      })
    })
  }
  render() { 
/* this uses lodash so the video search does 
   not reload the page on every key stroke, it has a delay
   of how ever much time you pass in as the second argument */
    const symbolSearch = _.debounce((term) => { this.symbolSearch(term) }, 500);
// in the return you pass in the child components you want to render
    return (
      <div>
        <SearchBar onSearchTermChange={symbolSearch} />
        <SymbolDetail symbol={this.state.Stocks}/>
      </div>
    );
  }
}

export default App;
