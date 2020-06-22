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
     this.getChartData();
   }

  getChartData(){
    // hacky special to grab refresh token from URL
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
      mode: 'cluster',
      form_data: '0x4G6N35niH6FWDKEVEeFP'
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
      const databyTrack = data.databyTrack
      const dataByAttribute = data.dataByAttribute
      
      this.setState({
        radarChartData:databyTrack,
        lineChartData:dataByAttribute
      });
    })
  }


  render() {
    return (
      <div className="App">
        <Chart radarChartData={this.state.radarChartData} lineChartData={this.state.lineChartData} location="Audio Features" legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;