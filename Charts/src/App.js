import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';



class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  handleDrag(){
    console.log('arrived in the top level app function')
  }
 
   componentDidMount(){
     // grab refresh token from URL
     let search = window.location.search;
     let params = new URLSearchParams(search);
    //  let data = {
    //    refresh_token: params.get('refresh_token'),
    //    mode: params.get('mode'),
    //    form_data: params.get('form_data')
    //  };
    let data = {
      refresh_token: 'AQArc_JXxZZSHt0ecz5VbBjRjURcibr89qfCuqh06JuZBGRCnzZkhCpLcS16XxnqfL570HStbprN9I6RCsn3v8eBbJvIda6__MVXvcKrSrcl9qlMWz2Y_1F4OKDtqzQIRjE',
      mode: 'playlist',
      form_data: '0GCBYmFvWnyY5ufGSXeVvg'
    }

    let posturl = 'https://music-in-context-backend.herokuapp.com/data';
    //send a post to the backend API to run the calcs and respond with data
    fetch(posturl,{
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then(response => response.json())
    .then(data => {
      this.setState({
        rawIncomingData: data
      });
    })
   }

  render() {
    return (
      <div className="App">
        <Chart rawIncomingData={this.state.rawIncomingData} location="Audio Features" legendPosition="bottom" onDrag={() => this.handleDrag()} />
      </div>
    );
  }
}

export default App;