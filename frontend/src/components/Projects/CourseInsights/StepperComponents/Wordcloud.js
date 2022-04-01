import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const words = [
    {
        text: 'told',
        value: 1,
    },
    {
        text: 'mistake',
        value: 1,
    },
    {
        text: 'thought',
        value: 1,
    },
    {
        text: 'bad',
        value: 1,
    },
]

export default function Wordcloud(props) {
    const keywords = props.keywords;

    console.log("KEYWORDS:", keywords);
    const options = {
        colors: ["#aab5f0", "#99ccee", "#a0ddff", "#00ccff", "#00ccff", "#90c5f0"],
        enableTooltip: true,
        deterministic: true,
        fontFamily: "arial",
        fontSizes: [15, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 3,
        rotations: 1,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
    };
    return <ReactWordcloud words={keywords} options={options} />
}