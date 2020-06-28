import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';



class App extends Component {
  constructor(){
    super();
    this.state = {
      radarChartData:{},
      lineChartData:{}
    }
  }
 
   componentDidMount(){
     //this.getChartData();

     // grab refresh token from URL
    // let search = window.location.search;
    // let params = new URLSearchParams(search);
    // let data = {
    //   refresh_token: params.get('refresh_token'),
    //   mode: params.get('mode'),
    //   form_data: params.get('form_data')
    // };
    //hard coded for testing
     let data = {
      refresh_token: 'AQACS834nGRrzXZySKHt90Nsu7vZWpKCmCM73hGFiva-nDRE5NHgg6q5XTvlH4tDcAfYvCIaLdMN2EerUVS2CyyYgPXR1crpFxtwvFQYqFJh8bhLQuCThQnto-AMhxszuCs',
      mode: 'playlist',
      form_data: '4MZTnMUwga6imMXcrepZ7y'
    };

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
        rawIncomingData: data,
        radarChartData: data.databyTrack,
        lineChartData: data.dataByAttribute,
        rawDataByTrack: data.rawDataByTrack,
        spotifyAudioFeatures: data.spotifyAudioFeatures
      });
    })
   }

  render() {
    return (
      <div className="App">
        <Chart rawIncomingData={this.state.rawIncomingData} radarChartData={this.state.radarChartData} lineChartData={this.state.lineChartData} rawData={this.state.rawDataByTrack} spotifyAudioFeatures={this.state.spotifyAudioFeatures} location="Audio Features" legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;