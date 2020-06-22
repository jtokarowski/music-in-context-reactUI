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
    return (
      <div className="chart">
        <Radar
          data={this.props.radarChartData}
          options={{
            //draggable chart js configs
            dragData: true,
            dragDataRound:1,
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