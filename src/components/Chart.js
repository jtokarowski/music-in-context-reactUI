import React, {Component} from 'react';
import { Line, Radar } from 'react-chartjs-2';
import 'chartjs-plugin-dragdata';

class Chart extends Component{
  constructor(props){
    super(props);
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    // unpack data into format for charts
    // console.log('raw data arriving in chart component', this.props.rawIncomingData)
    //listify all the data
    console.log(this.props)
    var incomingData = {
      trackNames: []
    }
    // pull data from props into new object
    try {
      Object.keys(this.props.rawIncomingData).map(key => (
        incomingData[key] = this.props.rawIncomingData[key]
        )
      )
      //assign blank arrays to store data by attribute
      incomingData.spotifyAudioFeatures.map((audioFeature) => {
        incomingData[audioFeature] = []
      })
      // push each data point on to the corresponding array
      incomingData.rawDataByTrack.map((track) => {
        incomingData['trackNames'].push(track.trackName)
        incomingData[track.trackName] = []
        //loop thru audio features appending to relevant arrays
        {incomingData.spotifyAudioFeatures.map((audioFeature) => {
          incomingData[audioFeature].push(track['audioFeatures'][audioFeature])
          incomingData[track.trackName].push(track['audioFeatures'][audioFeature])
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
      incomingData.spotifyAudioFeatures.map((audioFeature) => {
        let newAudioFeaturesObject = {
          label: audioFeature,
          data: incomingData[audioFeature],
          fill: false,
          borderColor: "rgba(94, 177, 208, 1)"
        }
        console.log(newAudioFeaturesObject)
        incomingData.dataByAudioFeature.datasets.push(newAudioFeaturesObject)
      })
      // create an object for each track
      incomingData.rawDataByTrack.map((track) => {
        let newTrackObject = {
          label: track.trackName,
          data: incomingData[track.trackName],
          fill: false,
          borderColor: "rgba(94, 177, 208, 1)"
        }
        incomingData.dataByTrack.datasets.push(newTrackObject)
      })
      console.log('incoming data fully unpacked', incomingData)
    }
    catch (error) {
      console.log('still loading data')
    }


   //{incomingData.spotifyAudioFeatures.map((attribute) => {
   // console.log(attribute)
   //})}
    ////////////////////////////////////////////////////////////////

    return (
      <div className="chart">
        <Radar
          data={incomingData.dataByTrack}
          options={{
            //draggable chart js configs
            dragData: true,
            dragDataRound:2,
            showTooltip: true,
            title:{
              display:this.props.displayTitle,
              text:this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            },
            scale:{
              ticks:{
                beginAtZero: true,
                max: 1
              }
            },
            onDragStart: function (e, element) {
              // where e = event
              console.log('dragging ', element)
              },
            onDrag: function (e, datasetIndex, index, value) {
              // change cursor style to grabbing during drag action
              e.target.style.cursor = 'grabbing'
              // where e = event
              },
            onDragEnd: function (e, datasetIndex, index, value) {
              // restore default cursor style upon drag release
              console.log('done dragging!')
              console.log(datasetIndex, index, value)
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
        <Line
          data={incomingData.dataByAudioFeature}
          options={{
            //draggable chart js configs
            dragData: true,
            dragDataRound:1,
            title:{
              display:this.props.displayTitle,
              text:this.props.location,
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
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;