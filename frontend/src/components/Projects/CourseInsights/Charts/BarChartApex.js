import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function BarChartApex(props) {
  const xAxis = [];
  const yValues = [];
  if (props.studyprogram) {
    const statistics = props.studyprogram.stats;
    for (const [key, value] of Object.entries(statistics)) {
      xAxis.push(key);
      yValues.push(value);
    }
  }

  const state = {
    //the data of the chart
    series: [{
      data: yValues
    }],
    // defines the properties of the chart
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
          colors: {
            ranges: [{
              from: 0,
              to: 5,
              color: '#00e5ff'
            }, {
              from: 6,
              to: 15,
              color: '#33c9dc'
            }, {
              from: 16,
              to: 30,
              color: '#2196f3'
            }, {
              from: 31,
              to: 70,
              color: '#0262f3'
            }, {
              from: 71,
              to: 95,
              color: '#07509e'
            }, {
              from: 96,
              to: 150,
              color: '#3f51b1'
            }, {
              from: 151,
              to: 300,
              color: '#3f51b5'
            }]
          }
        }
      },
      //defines the data labels
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '14px',
          fontFamily: 'small-caps',
          colors: ["#000"]
        }
      },
      //defines the x axis
      xaxis: {
        categories: xAxis,
        position: 'border',
        type: 'category',

        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          trim: true,
          hideOverlappingLabels: false,
          style: {
            fontFamily: 'small-caps',
            fontSize: '14px',
          }
        },
        tooltip: {
          enabled: false,
        }
      },
      //defines the y axis
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val;
          }
        }
      },
      tooltip: {
        enabled: false,
      },
      grid: {
        show: true,
      },
      //what is shown when there is no data
      noData: {
        text: 'Please select your studyprogram',
        style: {
          fontFamily: 'small-caps',
          fontSize: '14px',
        }
      }
    },


  }
  return (
    <div id="chart">
      <ReactApexChart options={state.options} series={state.series} type='bar' height={300} width={800}/>
    </div>
  )
}
