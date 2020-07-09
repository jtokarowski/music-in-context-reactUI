import React from "react";
import { FormRadio } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

var Spinner = require('react-spinkit');
var firstrun = true;
var isLoading = true;

class RadioForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlaylist: null,
      playlists: [],
      playlistIDs: [],
      playlistNames: [],
      playlistIndicators: []
    };

    this.changePlaylist = this.changePlaylist.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changePlaylist(playlist) {
    this.setState({
      selectedPlaylist: playlist
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var selectedPlaylistName = this.state.selectedPlaylist
    var selectedPlaylistIndexNumber = this.state.playlistNames.indexOf(selectedPlaylistName);
    var selectedPlaylistID = this.state.playlistIDs[selectedPlaylistIndexNumber]

    console.log('selected playlist ID', selectedPlaylistID)
    
    
    let baseURL = 'https://music-in-context.herokuapp.com/ui?'
    let fullURL = baseURL.concat('refresh_token=',this.props.refreshToken,'&form_data=',selectedPlaylistID,'&mode=',this.props.mode)

  window.location.href = fullURL
  }
  

  render() {
    try{
      this.props.data.map((playlist) => {
        this.state[playlist.playlistname] = this.state[playlist.playlistname]
        if(firstrun){
          this.state.playlists.push(playlist);
          this.state.playlistIDs.push(playlist.playlistID);
          this.state.playlistNames.push(playlist.playlistName);
          this.state.playlistIndicators.push(false);
        }
        })
        firstrun = false;
        console.log("state after pushing data", this.state)

      let RadioComponentList = [];
      RadioComponentList.push(<form onSubmit={this.handleSubmit}><input type="submit" value="Submit" /></form>)
      
      for(let i=0; i<this.state.playlists.length; i++) {
        let playlistName = this.state.playlistNames[i];
        RadioComponentList.push(
        <FormRadio
          name="playlist"
          checked={this.state.selectedPlaylist === playlistName}
          onChange={() => {
            this.changePlaylist(playlistName);
          }}
        >
          {playlistName}
        </FormRadio>
        )
      }

      RadioComponentList.push(<form onSubmit={this.handleSubmit}><input type="submit" value="Submit" /></form>)

      return RadioComponentList
      
    
    }
    catch(error){
      console.log('still loading');
      isLoading = true;
    }
    if (isLoading) {
      return (
        <div className="chart">
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
            <Spinner name='ball-triangle-path' fadeIn='none'/>
          </div>
          <div>
            <h1>Loading user playlists...</h1>
          </div>
        </div>
      )
    }

  }
}

export default RadioForm;