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
    // data unpack goes here

    return (
      <div className="chart">
        <Radar
          data={this.props.radarChartData}
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
          data={this.props.lineChartData}
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