import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';

class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  handleDrag = (datasetIndex, index, value) => {
    let selectedAttribute = this.state.rawIncomingData.spotifyAudioFeatures[index]  
    this.setState(prevState => { //https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
      let selectedTrack = Object.assign({}, prevState.rawIncomingData.rawDataByTrack[datasetIndex]);  // creating copy of state variable jasper
      selectedTrack.audioFeatures[selectedAttribute] = value;
      selectedTrack.audioFeatures['shouldChange'] = 1;                                    
      return { selectedTrack };                                 
    })
  }

  handleColorChange = (index) =>{
    console.log("index in parent app", index)
    this.setState(prevState => { //https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
      let selectedTrackIndex = Object.assign({}, prevState.selectedTrackIndex); 
      selectedTrackIndex = index;
      return { selectedTrackIndex };
    })
  }

  handleReset = (event) =>{
    event.preventDefault();
    console.log("Reset triggered")
    //TODO this doesn't work
    this.setState({
      rawIncomingData: this.state.previousState
    })
  }

  handleCommitSet(event){
    event.preventDefault();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let data = {
      refresh_token: params.get('refresh_token'),
      mode: params.get('mode')
    };

    let posturl = 'https://music-in-context-backend.herokuapp.com/commitplaylist';
    //send a post to the backend API to run the calcs and respond with data
    fetch(posturl,{
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          refresh_token: data.refresh_token,
          mode: data.mode,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then(console.log("Sent to Spotify"))
  }

  handleRequestNewTracks(event){
    event.preventDefault();
    // grab refresh token from URL
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let data = {
      refresh_token: params.get('refresh_token'),
      mode: params.get('mode')
    };

    let posturl = 'https://music-in-context-backend.herokuapp.com/changeset';
    //send a post to the backend API to run the calcs and respond with data
    fetch(posturl,{
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          previousTrackList: this.state.rawIncomingData.rawDataByTrack,
          previousTrackIDs: this.state.rawIncomingData.trackIDs,
          refresh_token: data.refresh_token,
          mode: data.mode,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then(response => response.json())
    .then(data => {
      this.setState(prevState => { //https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        let rawIncomingData = Object.assign({}, prevState.rawIncomingData);
        rawIncomingData.rawDataByTrack = data.newTracks;
        rawIncomingData.trackIDs = data.trackIDs;
        return { rawIncomingData };
      })
    })
    .then(console.log(this.state))
  }
 
   componentDidMount(){
     // grab refresh token from URL
     let search = window.location.search;
     let params = new URLSearchParams(search);
     let data = {
       refresh_token: params.get('refresh_token'),
       mode: params.get('mode'),
       form_data: params.get('form_data')
     };

    let posturl = 'https://music-in-context-backend.herokuapp.com/setfromcluster';
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
        rawIncomingData: data,
        previousState: data,
        selectedTrackIndex: 0
      });
    })
   }

  render() {
    return (
      <div className="App">
        <Chart 
        rawIncomingData={this.state.rawIncomingData} 
        title="Audio Features" 
        legendPosition="bottom" 
        onDrag={(datasetIndex, index, value) => this.handleDrag(datasetIndex, index, value)} 
        onRequestNewTracks={(value) => this.handleRequestNewTracks(value)} 
        onCommitSet={(value) => this.handleCommitSet(value)} 
        onReset={(value) => this.handleReset(value)} 
        onColorChange={(element) => this.handleColorChange(element)} 
        colors={['rgba(245, 94, 29, 1)', 'rgba(0, 0, 0, 0.1)']}
        selectedTrackIndex={this.state.selectedTrackIndex}   
        />
      </div>
    );
  }
}

export default App;