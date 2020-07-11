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
    // console.log('this.state before update')
    // console.log(this.state)
    // console.log('arrived in the parent component')
    // console.log(datasetIndex, index, value)
    let selectedAttribute = this.state.rawIncomingData.spotifyAudioFeatures[index]
    //let trackToEdit = this.state.rawIncomingData.rawDataByTrack[datasetIndex]
    //console.log(selectedAttribute, trackToEdit)
    this.setState(prevState => {
      let selectedTrack = Object.assign({}, prevState.rawIncomingData.rawDataByTrack[datasetIndex]);  // creating copy of state variable jasper
      selectedTrack.audioFeatures[selectedAttribute] = value;                     // update the name property, assign a new value                 
      return { selectedTrack };                                 // return new object jasper object
    })
    //this.setState((state, selectedAttribute, trackToEdit) => ({}))
    //console.log(selectedAttribute)
    //console.log(this.state.rawIncomingData.rawDataByTrack[datasetIndex])
    //console.log('original value', this.state.rawIncomingData.rawDataByTrack[datasetIndex]['audioFeatures'][selectedAttribute])
    //this.state.rawIncomingData.rawDataByTrack[datasetIndex]['audioFeatures'][selectedAttribute] = value
    //console.log('this.state after update')
    //console.log(this.state)
  }

  handleSubmit(param){
    //event.preventDefault();
    console.log('submitted to the parent component')
    console.log(param)
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
      form_data: '4xWULTfuUD3oW4hDqwztoE'
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
        <Chart rawIncomingData={this.state.rawIncomingData} title="Audio Features" legendPosition="bottom" onDrag={(datasetIndex, index, value) => this.handleDrag(datasetIndex, index, value)} onSubmit={(value) => this.handleSubmit(value)} />
      </div>
    );
  }
}

export default App;