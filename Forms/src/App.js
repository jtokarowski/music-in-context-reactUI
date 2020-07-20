import React, { Component } from 'react';
import './App.css';
import ToggleForm from './components/ToggleForm';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

var Spinner = require('react-spinkit');


class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
 
  componentDidMount() {
     let search = window.location.search;
     let params = new URLSearchParams(search);
     let data = {
       refresh_token: params.get('refresh_token'),
       mode: params.get('mode')
     };
    
    let posturl = 'https://music-in-context-backend.herokuapp.com/clustertracks';
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
      console.log('data from post', data)
      this.setState({
        clusters: data.clusters,
        refreshToken: data.refreshToken,
        mode: data.mode
      });
    })
  }

  render() {
    return(
    <div className="App">
      <ToggleForm  mode={this.state.mode} refreshToken={this.state.refreshToken} data={this.state.clusters}/>
    </div>
    )
  }
}

export default App;