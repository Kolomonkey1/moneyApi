import React, { Component } from 'react';
import './App.css';
import Stocks from './Stocks';
import Search from './search_bar';
import _ from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      search: ''
    };
    this.symbolSearch('MSFT');
  }
  
  symbolSearch(symbol) {
      this.setState({ 
        search: symbol
       });
  }

  componentWillMount(){
    //single stock call
    // var url = 'https://api.robinhood.com/quotes/MSFT/?token=9e69c3b5306b5653ae1da50ac07dc2a42e9793ea';
    //multiple stock calls
    var url = `https://api.robinhood.com/quotes/?symbols=${symbol}&token=9e69c3b5306b5653ae1da50ac07dc2a42e9793ea`;
    var myHeaders = new Headers();
    var myInit = { method: 'GET',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    // fetch() hits a url and brings back a response
    fetch(url, myInit).then(
      (response) => {
         console.log('RESPONSE: ', response);
        //response is then returned to us to use as json formatted data
        return response.json();
      })
    // we then pass that data under "json" and use that to set state
    .then((json) => {
      console.log("json - ", json.results);
      this.setState({
        // ...this.state,
        // Name: json.symbol,
        // LastTradePrice: json.last_trade_price,
        Stocks: json.results,
      })
      // console.log("json " ,json);
      // console.log("state.student ",this.state.student);
    })
  }

  // addStudent(){
  //   this.setState({
  //     gradebookStudent: false,
  //     newStudent: true
  //   })
  // }

  render() {
    const symbolSearch = _.debounce((symbol) => { this.symbolSearch(symbol) }, 300);

        return (
          <div>
           <Stocks Stocks={this.state.Stocks}/>
           <Search onSearchTermChange={symbolSearch}/>
          </div>  
        );
      }
  }


export default App;