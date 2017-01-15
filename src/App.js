import './App.css';
import _ from 'lodash';
import React, { Component } from 'react';
import SearchBar from './search_bar';
import SymbolDetail from './symbol_detail';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
   };
   this.symbolSearch('MSFT');
  }

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

    const symbolSearch = _.debounce((term) => { this.symbolSearch(term) }, 500);

    return (
      <div>
        <SearchBar onSearchTermChange={symbolSearch} />
        <SymbolDetail symbol={this.state.Stocks}/>
      </div>
    );
  }
}

export default App;
