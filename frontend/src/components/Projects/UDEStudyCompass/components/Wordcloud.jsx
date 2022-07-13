import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { loading } from "../StudyCompassHomepage";

const WordCloud = (props) => {
  const { keywords } = props;
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const temp = [];
    keywords.forEach((keyword) => {
      temp.push({
        ...keyword,
        value: keyword.value * 1000,
      });
    });
    setData(temp);
    setTimeout(() => {
      setShow((prevState) => !prevState);
    }, 200);
  }, []);

  const openModal = (word) => {
    console.log(`Word clicked: ${word}`);
  };

  return (
    <>
      {show ? (
        <>
          <ReactWordcloud
            words={data}
            options={{
              colors: [
                "#b39ddb",
                "#7e57c2",
                "#4fc3f7",
                "#03a9f4",
                "#0288d1",
                "#01579b",
              ],
              enableTooltip: true,
              deterministic: true,
              fontFamily: "helvetica",
              fontSizes: [14, 64],
              fontStyle: "normal",
              fontWeight: "normal",
              padding: 3,
              rotations: 1,
              rotationAngles: [0, 90],
              scale: "sqrt",
              spiral: "archimedean",
              transitionDuration: 1000,
            }}
            callbacks={{
              onWordClick: (word) => openModal(word.text),
              getWordTooltip: (word) => `Topic: "${word.text}"`,
            }}
          />
        </>
      ) : (
        <> {loading} </>
      )}
    </>
  );
};

export default WordCloud;
