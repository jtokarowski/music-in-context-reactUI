import React from "react";
import { FormCheckbox } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

var Spinner = require('react-spinkit');
var firstrun = true;
var isLoading = true;

class ToggleForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      playlists: [],
      playlistIDs: [],
      playlistNames: [],
      playlistIndicators: [],
      clusters:[],
      clusterIDs:[],
      clusterDescriptions: [],
      clusterMostFrequentArtists:[],
      clusterMostFrequentGenres:[],
      clusterIndicators:[],
    };
  }

  handleChange(e, clusterDescrip) {
    var indexNumber = this.state.clusterDescriptions.indexOf(clusterDescrip);
    const newState = {};

    newState[clusterDescrip] = !this.state[clusterDescrip];
    this.setState({ ...this.state, ...newState });
    this.state.clusterIndicators[indexNumber] = newState[clusterDescrip]
  }

  handleSubmit(event) {
    event.preventDefault();
    var selectedClusters = []
    for(let i=0; i<this.state.clusterIndicators.length; i++) {
      if(this.state.clusterIndicators[i]){
        selectedClusters.push(this.state.clusterIDs[i])
      }
    }
    let clusterIDstring = selectedClusters.join(',')
    
    let baseURL = 'https://music-in-context.herokuapp.com/ui?'
    let fullURL = baseURL.concat('refresh_token=',this.props.refreshToken,'&form_data=',clusterIDstring,'&mode=',this.props.mode)

  window.location.href = fullURL
  }

  render() {

    try {
      this.props.data.map((playlist) => {
      this.state[playlist.playlistname] = this.state[playlist.playlistname]
      if(firstrun){
        this.state.playlists.push(playlist);
        this.state.playlistIDs.push(playlist.playlistID);
        this.state.playlistNames.push(playlist.playlistName);
        this.state.playlistIndicators.push(false);

        //NEW
        this.state.clusters.push(playlist);
        this.state.clusterIDs.push(playlist.clusterNumber);
        let clusterDescription = "This sub-collection contains the following genres: "+ playlist.mostFrequentGenres.join()+" and the following artists: "+ playlist.mostFrequentArtists.join();
        console.log(clusterDescription)
        this.state.clusterDescriptions.push(clusterDescription)
        this.state.clusterIndicators.push(false);
      }
      })
      firstrun = false;
      console.log("state after pushing data", this.state)

      let checkBoxComponentList = [];

      checkBoxComponentList.push(<h3>Select one or more collections for inclusion in your custom playlist</h3>)
      
      for(let i=0; i<this.state.playlists.length; i++) {
        let clusterName = this.state.clusterDescriptions[i];
        checkBoxComponentList.push(
        <FormCheckbox
          toggle
          checked= {this.state[clusterName]}
          onChange={e => this.handleChange(e, clusterName)}
        >
          {clusterName}
        </FormCheckbox>
        )
      }

      checkBoxComponentList.push(<form onSubmit={this.handleSubmit}><input type="submit" value="Submit" /></form>)
      
    return checkBoxComponentList
    }
    catch(error) {
      console.log('still loading');
      isLoading = true;
    }
    if (isLoading) {
      return(
        <div className="loading">
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
            <Spinner name='ball-triangle-path' fadeIn='none'/>
          </div>
          <div>
            <h1>Building a pool of recommended tracks</h1>
          </div>
        </div>
      )
    }
  }
}

export default ToggleForm;