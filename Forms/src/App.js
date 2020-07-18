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
  if(this.state.mode === 'tunnel'){
    return(
    <div className="App">
      <ToggleForm  mode={this.state.mode} refreshToken={this.state.refreshToken} data={this.state.clusters}/>
    </div>
    )
  }
  else{
    return(
      <div className="loading">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
          <Spinner name='ball-triangle-path' fadeIn='none'/>
          <div>
            <h1>Loading user playlists...</h1>
          </div>
        </div>
        
      </div>
    )
  }
  }
}

export default App;