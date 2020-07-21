import React, { Component } from 'react';
import './App.css';
import ToggleForm from './components/ToggleForm';
import RadioForm from './components/RadioForm';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class App extends Component {
  constructor(){
    super();
    this.state = {
      mode: 'tunnel'
    }
  }
 
  componentDidMount() {
     let search = window.location.search;
     let params = new URLSearchParams(search);
     let data = {
       refresh_token: params.get('refresh_token'),
       mode: params.get('mode')
     };
     let posturl = ''
     if(data.mode == 'tunnel'){
      posturl = 'https://music-in-context-backend.herokuapp.com/clustertracks';
    }
    else if(data.mode == 'playlist'){
      posturl = 'https://music-in-context-backend.herokuapp.com/getuserplaylists';
    }
    
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
        data: data,
        refreshToken: data.refreshToken,
        mode: data.mode
      });
    })
  }

  render() {
    if(this.state.mode == 'tunnel'){
      return(
        <div className="App">
          <ToggleForm  mode={this.state.mode} refreshToken={this.state.refreshToken} data={this.state.data}/>
        </div>
        )
    }
    else if(this.state.mode == 'playlist'){
      return(
        <div className="App">
          <RadioForm  mode={this.state.mode} refreshToken={this.state.refreshToken} data={this.state.data}/>
        </div>
        )
    }
  }
}

export default App;