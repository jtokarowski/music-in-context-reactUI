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

  handleSubmit(event){
    event.preventDefault();
    console.log('submitted to the parent component')
    //TODO send this state to the backend
    //TODO fix the default behavior
    // let data = {
    //   refresh_token: 'AQArc_JXxZZSHt0ecz5VbBjRjURcibr89qfCuqh06JuZBGRCnzZkhCpLcS16XxnqfL570HStbprN9I6RCsn3v8eBbJvIda6__MVXvcKrSrcl9qlMWz2Y_1F4OKDtqzQIRjE',
    //   mode: 'playlist',
    //   form_data: '1qYIatRJ6FRdmZGu4kYM3s'
    // }

    let posturl = 'http://127.0.0.1:7000/changeset';
    //send a post to the backend API to run the calcs and respond with data
    fetch(posturl,{
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          previousTrackList: this.state.rawIncomingData.rawDataByTrack,
          refresh_token: 'AQArc_JXxZZSHt0ecz5VbBjRjURcibr89qfCuqh06JuZBGRCnzZkhCpLcS16XxnqfL570HStbprN9I6RCsn3v8eBbJvIda6__MVXvcKrSrcl9qlMWz2Y_1F4OKDtqzQIRjE'
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then(response => response.json())
    .then(data => {
      this.setState(prevState => { //https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
        let rawIncomingData = Object.assign({}, prevState.rawIncomingData);
        rawIncomingData.rawDataByTrack = data
        return { rawIncomingData };
      })
    })
    .then(console.log(this.state))
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
      mode: 'tunnel',
      form_data: '5kbJeLyeywPmSKMpjUrZu8'
    }

    let posturl = 'http://127.0.0.1:7000/data';
    //let posturl = 'https://music-in-context-backend.herokuapp.com/data';
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
        <Chart rawIncomingData={this.state.rawIncomingData} title="Audio Features" legendPosition="bottom" onDrag={(datasetIndex, index, value) => this.handleDrag(datasetIndex, index, value)} onSubmit={(value) => this.handleSubmit(value)} />
      </div>
    );
  }
}

export default App;