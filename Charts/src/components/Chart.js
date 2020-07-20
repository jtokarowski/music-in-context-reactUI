import React, {Component} from 'react';
import { Line, Radar } from 'react-chartjs-2';
import 'chartjs-plugin-dragdata';

var Spinner = require('react-spinkit');

let isLoading = true;

class Chart extends Component{

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    colors: ['rgba(245, 94, 29, 0.8)', 'rgba(0, 0, 0, 0.3)'],
    //location:'City'
  }

  render(){
    
    //unpack data into chart-able format
    var incomingData = {
      trackNames: [],
      subTrackData: {},
      subAudioFeatureData: {}
    }
    // pull data from props into new object
    try {
      Object.keys(this.props.rawIncomingData).map(key => (
        incomingData[key] = this.props.rawIncomingData[key]
        )
      )
      //assign blank arrays to store data by attribute
      incomingData.spotifyAudioFeatures.map((audioFeature) => {
        incomingData.subAudioFeatureData[audioFeature] = []
      })
      // push each data point on to the corresponding array
      incomingData.rawDataByTrack.map((track) => {
        incomingData['trackNames'].push(track.trackName)
        incomingData.subTrackData[track.trackName] = []
        //loop thru audio features appending to relevant arrays
        {incomingData.spotifyAudioFeatures.map((audioFeature) => {
          incomingData.subAudioFeatureData[audioFeature].push(track['audioFeatures'][audioFeature])
          incomingData.subTrackData[track.trackName].push(track['audioFeatures'][audioFeature])
        })}
      })      
      //create the dataByAttribute object
      incomingData.dataByAudioFeature = {
        datasets: [],
        labels: incomingData.trackNames
      }
      incomingData.dataByTrack = {
        datasets: [],
        labels: incomingData.spotifyAudioFeatures
      }
      // create an object for each attribute
      let colorIndexAF = 0;
      //let pointColorArray = ['rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)','rgba(196, 226, 252, 1)'] 
      //TODO create an array of same color matching length of tracks
      // then set the appropriate index to orange if it matches selectedTrackIndex
      incomingData.spotifyAudioFeatures.map((audioFeature) => {
        let seriesColor = incomingData.colors[colorIndexAF]
        let pointColorArray = []
        let pointBackgroundColorArray = []
        let pointRadiusArray = []
        for (var i = 0; i < incomingData.trackNames.length; i++) {
          if(i == this.props.selectedTrackIndex){
            pointColorArray.push('rgba(245, 94, 29, 1)');
            pointBackgroundColorArray.push('rgba(245, 94, 29, 1)')
            pointRadiusArray.push(6)
          }
          else{
            pointColorArray.push(seriesColor);
            pointBackgroundColorArray.push('rgba(0, 0, 0, 0.1)')
            pointRadiusArray.push(3)
          }
          
        }
        let newAudioFeaturesObject = {
          label: audioFeature,
          data: incomingData.subAudioFeatureData[audioFeature],
          fill: false,
          borderColor: pointColorArray,
          backgroundColor: pointBackgroundColorArray,
          radius: pointRadiusArray
        }
        colorIndexAF += 1
        incomingData.dataByAudioFeature.datasets.push(newAudioFeaturesObject)
      })
      // create an object for each track  
      let colorIndexBT = 0;
      incomingData.rawDataByTrack.map((track) => {
        let color = this.props.colors[1]
        let shouldDrawBorder = false
        if (colorIndexBT === this.props.selectedTrackIndex){
          color = this.props.colors[0]
          shouldDrawBorder = true
        }
        colorIndexBT += 1
        let newTrackObject = {
          label: track.trackName,
          data: incomingData.subTrackData[track.trackName],
          fill: true,
          borderColor: color,
          drawBorder: shouldDrawBorder
        }
        // if (colorIndexBT === 0){
        //   colorIndexBT = 1
        // }
        incomingData.dataByTrack.datasets.push(newTrackObject)
      })
      isLoading = false;
    }
    catch (error) {
      console.log('still loading data');
      isLoading = true;
    }

    if (isLoading) {
      return (
        <div className="loading">
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
            <Spinner name='ball-triangle-path' fadeIn='none'/>
          </div>
          <div>
            <h1>Loading track data...</h1>
          </div>
        </div>
      )

    }
    return (
      <div className="chart">
        <div className="topRow">
          <div className="buttons">
            <form onSubmit={(e)=>this.props.onRequestNewTracks(e)}><input type="submit" value="Swap adjusted tracks with new recommendations" /></form>
            <form onSubmit={(e)=>this.props.onCommitSet(e)}><input type="submit" value="Upload this playlist to Spotify" /></form>
          </div>
          <div className="radar">
            <Radar
              data={incomingData.dataByTrack}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                //draggable chart js configs
                dragData: true,
                dragDataRound:2,
                showTooltip: true,
                title:{
                  display:false,
                  text:this.props.title,
                  fontSize:25
                },
                legend:{
                  display:true,
                  position:'right'
                },
                scale:{
                  ticks:{
                    beginAtZero: true,
                    max: 1
                  } 
                },
                onDragStart: (e, element) => {
                  // where e = event
                  console.log('dragging ', element)
                  this.props.onColorChange(element._datasetIndex);
                  },
                onDrag: function (e, datasetIndex, index, value) {
                  // change cursor style to grabbing during drag action
                  e.target.style.cursor = 'grabbing'
                  // where e = event
                  },
                onDragEnd: (e, datasetIndex, index, value) => {              
                  this.props.onDrag(datasetIndex, index, value);
                  // restore default cursor style upon drag release
                  e.target.style.cursor = 'default'
                  // where e = event
                  },
                //enable grab icon when user hovers over control points
                hover: {
                  onHover: function(e) {
                    // indicate that a datapoint is draggable by showing the 'grab' cursor when hovered
                    const point = this.getElementAtEvent(e)
                    if (point.length) e.target.style.cursor = 'grab'
                    else e.target.style.cursor = 'default'
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="line">
          <Line
            data={incomingData.dataByAudioFeature}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              //draggable chart js configs
              dragData: true,
              dragDataRound:2,
              title:{
                display:false,
                text:this.props.title,
                fontSize:25
              },
              scales:{
                yAxes:[{
                  ticks:{
                    min: 0,
                    max: 1,
                    stepSize: 0.1
                  }
                }]
              },
              legend:{
                display:this.props.displayLegend,
                position:'right'
              },
              onDragStart: (e, element) => {
                // where e = event
                console.log('dragging ', element)
                this.props.onColorChange(element._index);
                },
              onDrag: function (e, datasetIndex, index, value) {
                // change cursor style to grabbing during drag action
                e.target.style.cursor = 'grabbing'
                // where e = event
                },
              onDragEnd: (e, datasetIndex, index, value) => {
                this.props.onDrag(index, datasetIndex, value);
                //incomingData.dataByTrack.datasets[index]['data'][datasetIndex] = value
                e.target.style.cursor = 'default'
                // where e = event
                },
              //enable grab icon when user hovers over control points
              hover: {
                onHover: function(e) {
                  // indicate that a datapoint is draggable by showing the 'grab' cursor when hovered
                  const point = this.getElementAtEvent(e)
                  if (point.length) e.target.style.cursor = 'grab'
                  else e.target.style.cursor = 'default'
                }
              }
            }}
            />
          </div>
      </div>
    )
  }
}

export default Chart;