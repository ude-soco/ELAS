import React from 'react';
import ReactApexChart from "react-apexcharts";

//combines the name of the subject with its data
function generateHeatMapData(subjectsAndOverlapping) {
    let data = [];
    let subjectX = "";
    for (let subject of subjectsAndOverlapping) {
        if (subjectX !== subject.subjectA.name) {
            subjectX = subject.subjectA.name;
            data.push({
                    name: subjectX,
                    data: generateData(subjectX, subjectsAndOverlapping)
                })
        }
    }
    return data;
}

//creates the oy values for a subject
function generateData(subject, subjectsAndOverlapping) {
    let xydata = [];
    for (let sub of subjectsAndOverlapping) {

        if (subject === sub.subjectA.name) {
            if (sub.overlaps.length === 0) {
                if (sub.subjectA.name === sub.subjectB.name) {
                    xydata.push({
                        x: sub.subjectB.name,
                        y: 0
                    })
                } else {
                    xydata.push({
                        x: sub.subjectB.name,
                        y: 10
                    })
                }
            } else {
                const severities = [];
                for(let overlapseverity of sub.overlaps){
                    severities.push(overlapseverity.severity);
                }
                if(severities.includes("critical")){
                    for(let overlap of sub.overlaps){
                        if(overlap.severity === "critical"){
                            xydata.push({
                                x: sub.subjectB.name,
                                y: 100
                            })
                            break;
                        }
                    }
                } else {
                        xydata.push({
                            x: sub.subjectB.name,
                            y: 50
                        })
                    }
            }
        }
    }
    return xydata;
}

export default function HeatMap(props) {
    const heatMapData = generateHeatMapData(props.data);

    const state = {
        //the data of the heatmap
        series: heatMapData,
        //defines the properties of the heatmap
        options: {
            chart: {
                type: 'heatmap',
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 0.5,
                    radius: 0,
                    useFillColorAsStroke: true,
                    colorScale: {
                        ranges: [{
                            from: 1,
                            to: 20,
                            name: 'no overlapping',
                            color: '#03f60f'
                        },
                            {
                                from: 22,
                                to: 50,
                                name: 'no time between subjects',
                                color: '#ffa500'
                            },
                            {
                                from: 52,
                                to: 100,
                                name: 'overlapping',
                                color: '#fa0404'
                            }
                        ]
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                onDatasetHover: {
                    highlightDataSeries: false,
                },
                enabled: true,
                x: {
                    show: false,
                },
                y: {
                    formatter: function (val) {
                        if (val === 10) {
                            return 'no overlapping'
                        } else if (val === 50) {
                            return 'no time between subjects'
                        } else if (val === 100) {
                            return 'overlapping'
                        }
                    }
                }
            },
            //defines the x axis
            xaxis: {
                type: 'category',
                labels: {
                    rotate: -55,
                    rotateAlways: false,
                    show: true,
                    trim: true,
                    hideOverlappingLabels: false,
                    maxHeight: 80,
                    style: {
                        colors: '#000',
                        fontSize: '14px',
                        fontFamily: "small-caps"
                    },
                    offsetX: 5,
                },
            },
            //defines the y axis
            yaxis: {
                show: true,
                opposite: true,
                forceNiceScale: true,
                labels: {
                    show: true,
                    maxWidth: 80,
                    align: 'left',
                    style: {
                        fontSize: '14px',
                        colors: '#000',
                        fontFamily: 'small-caps'
                    },
                }
            },
            grid: {
                show: true,
                borderColor: "#000",
                position: 'front',
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            },
            stroke: {
                width: 1
            },
            title: {
                text: 'Your Overlappings'
            },
            // what is shown when there is no data
            noData:{
                text: 'You have no selected subjects'
            }
        },
    };
    return (<ReactApexChart options={state.options} series={state.series} type="heatmap" width={390} height={390}/>);
}



