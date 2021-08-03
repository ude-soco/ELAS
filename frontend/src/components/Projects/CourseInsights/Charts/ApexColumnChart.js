import React from 'react';
import ReactApexChart from "react-apexcharts";

export default function ApexColumnChart(props) {
    const markedSubjects = props.selected;

    //creates the values of the labels of the x axis
    const generateXAxis = (markedsubjects) => {
        const xAxis = [];
        for (let marked of markedsubjects) {
            if (!xAxis.includes(marked.subject_type)) {
                xAxis.push(marked.subject_type);
            }
        }
        return xAxis;
    }

    const xAxis = generateXAxis(markedSubjects);

    //creates the data for x and y axis
    const generateXYData = (marked, xAxis) => {
        const data = [];
        for (let x of xAxis) {
            if (x === marked.subject_type) {
                if (marked.sws === '1') {
                    data.push({
                        x: x,
                        y: 1,
                    })
                } else if (marked.sws === '2') {
                    data.push({
                        x: x,
                        y: 2,
                    })
                } else if (marked.sws === '3') {
                    data.push({
                        x: x,
                        y: 3,
                    })
                }else if(marked.sws === ' '){
                   data.push({
                       x: x,
                       y: 1,
                   })
                } else {
                    data.push({
                        x: x,
                        y: 4,
                    })
                }
            } else {
                data.push({
                    x: x,
                    y: 0,
                })
            }
        }
        return data;
    }

    // combines the labels of the x axis with the data for the x and y axis
    const generateData = (markedSubjects, xAxis) => {
        const data = [];
        for (let marked of markedSubjects) {
            data.push({
                name: marked.name,
                data: generateXYData(marked, xAxis)
            })
        }
        return data;
    }

    const chartdata = generateData(markedSubjects, xAxis);

    const state = {
        //the data of the chart
        series: chartdata,
        options: {
            //defines the properties of the bar chart
            chart: {
                type: 'bar',
                height: 200,
                stacked: true,
                toolbar: {
                    show: true
                },

            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10,
                    barHeight: '0%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            // defines the xaxis
            xaxis: {
                categories: xAxis,
                labels: {
                    style: {
                        fontFamily: 'small-caps',
                        fontSize: '14px',
                    }
                }
            },
            legend: {
                show: false,
                position: 'right',
                offsetY: 100
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                x: {
                    show: true,
                },
                y: {
                    formatter: function (val) {
                        return ''
                    }
                }
            },
            //defines the y axis
            yaxis: {
                show: true,
                labels: {
                    show: true,
                    style: {
                        fontFamily: 'small-caps',
                        fontSize: '14px',
                    }
                },
                title: {
                    text: 'SWS',
                    rotate: -0,
                    offsetY: -115,
                    style: {
                        fontFamily: "small-caps",
                        fontSize: '14px',
                    }
                }
            },
            colors: ['#00e5ff', '#33c9dc', '#2196f3', '#0262f3',
                '#07509e', '#3f51b1'],
            grid: {
                show: true,
            },
            // what is shown when there is no data
            noData: {
                text: 'You have to select at least one subject',
                style: {
                    fontFamily: 'small-caps',
                    fontSize: '14px',
                }
            }
        }
    }
    return (<ReactApexChart options={state.options} series={state.series} type='bar' height="100%"/>);
}