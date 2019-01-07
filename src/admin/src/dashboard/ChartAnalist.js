import React from "react";
import Chart from "react-google-charts";

import CircularProgress from "@material-ui/core/CircularProgress";

class StatisticChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
      dataLineChart: [],
    };
  }
  

  render() {
    return (
      <div className="comment col-md-12 module">
        {this.props.dataChart.length==0?<div className="loading-progress"> <CircularProgress size={50} /></div>:
        
          <Chart
            width={"100%"}
            height={"200px"}
            chartType="LineChart"
            loader={<div>Tải dữ liệu</div>}
            data={this.props.dataChart}
            options={{
              title: "ĐƯỜNG XU HƯỚNG THẢO LUẬN",
              // backgroundColor: "#002864",
              legendTextStyle: { color: "#FFF" },
              titleTextStyle: {
                color: "black",
                fontFamily: "Maven Pro",
                fontSize: "13",
              },
              hAxis: {
                // format: 'decimal',
                textStyle: {
                  color: "black",
                  fontFamily: "Maven Pro",
                  fontName: "Maven Pro",
                  fontSize: "8",
                  fontWeight: "normal",
                },
                // titleTextStyle: {color: 'white'},
                title: 'Thời gian',
                gridlines: {
                  // color: "#ffffff",
                },
                // baselineColor: "#0a4caf",
              },
              vAxis: {
                textStyle: {
                  color: "black",
                  fontFamily: "Maven Pro",
                  fontName: "Maven Pro",
                  fontSize: "10",
                },
                titleTextStyle: { color: "white" },
                gridlines: {
                  // color: "#0a4caf",
                },
                title: 'Số lần thảo luận',
                // baselineColor: "#0a4caf",
              },
              curveType: "function",
              legend: { position: "bottom" },
              colors: ["#00ce7d", "#ff0000"],
              chartArea: { left: 40, width: "95%" },
              pointSize: 8,
              bar: { groupWidth: "100%" },
              //  legend: { position: 'none' },
              series: {
                1: { curveType: "function" },
              },
            }}
            rootProps={{ "data-testid": "2" }}
          />
        }
        
      </div>
    );
  }
}

export default StatisticChart;
