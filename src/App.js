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
      const OGdatabyTrack = data.databyTrack
      const OGdataByAttribute = data.dataByAttribute
      const rawDataByTrack = data.rawDataByTrack
      const spotifyAudioFeatures = data.spotifyAudioFeatures

      this.setState({
        radarChartData: data.databyTrack,
        lineChartData: data.dataByAttribute,
        rawDataByTrack: data.rawDataByTrack,
        spotifyAudioFeatures: data.spotifyAudioFeatures
      });

      //listify all the data
      var incomingData = {
        OGdataByTrack: data.databyTrack,
        OGdataByAttribute: data.dataByAttribute,
        trackNames: []
      }
      {Object.keys(data).map(key => (
        incomingData[key] = data[key]
        )
      )}
      //assign blank arrays to store data by attribute
      {incomingData.spotifyAudioFeatures.map((audioFeature) => {
        incomingData[audioFeature] = []
       })}

       // push each data point on to the corresponding array
       {incomingData.rawDataByTrack.map((track) => {
         incomingData['trackNames'].push(track.trackName)
        //loop thru audio features
        {incomingData.spotifyAudioFeatures.map((audioFeature) => {
          incomingData[audioFeature].push(track['audioFeatures'][audioFeature])
         })}
       })      
      }

      //create the dataByAttribute object
      incomingData.NEWdataByAttribute = {
        datasets: [],
        labels: incomingData.trackNames
      }
      incomingData.NEWdataByTrack = {
        datasets: [],
        labels: incomingData.spotifyAudioFeatures
      }
      // create an object for each attribute
      {incomingData.spotifyAudioFeatures.map((audioFeature) => {
        var newObject = {
          label: audioFeature,
          data: incomingData.audioFeature,
          fill: false,
          borderColor: "rgba(94, 177, 208, 1)"
        }
        incomingData.NEWdataByTrack.datasets.push(newObject)
       })}


      

      console.log(incomingData)
      //console.log(incomingData)
     console.log(this.state.rawDataByTrack instanceof Array)

     //{incomingData.spotifyAudioFeatures.map((attribute) => {
     // console.log(attribute)
     //})}
      
      
    })
   }

  render() {
    return (
      <div className="App">
        <Chart radarChartData={this.state.radarChartData} lineChartData={this.state.lineChartData} rawData={this.state.rawDataByTrack} spotifyAudioFeatures={this.state.spotifyAudioFeatures} location="Audio Features" legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;