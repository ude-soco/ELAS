import React from "react";
import { SiteCardArea } from "./SiteCardStyled";
import { SiteCard } from "./SiteCard";

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
      {
        cardtitle: "ACTIVISTS",
        cardundertitle: "Concrete experiencer",
        cardundertitle2: "Active experimenter",
        carddescription: "Activists learning style is: „hands-on“. They rely on intuition rather than logic and have a strong preference for „doing“ rather than „thinking“. They use other people’s analysis and take a more practical, experimental approach. They like new challenges, experiences and take risks. The central focus is on team problem-solving.",
        cardexpandedtitle: "Activists are accomodators:",
        cardexpandedtext: "Accomodators tend to rely on other people's information. They are oriented people and don’t like logical analysis. They do not like routine and will take creative risks to see what happens. People with this learning style will ask themselves: 'What if something happens?'"
      },
      {
        cardtitle: "THEORIST",
        cardundertitle: "Abstract conceptualiser",
        cardundertitle2: "Reflective observer",
        carddescription: "Theorists learning preference involves a logical approach. Ideas and concepts are more important than people. People with this learning style want a good and clear explanation rather than a practical opportunity. They have an understanding of wide-ranging information and organizing it in a clear, logical way.",
        cardexpandedtitle: "Theorists are assimilators:",
        cardexpandedtext: "Assimilators are less focused on people and more interested in ideas and abstract concepts. They are more attracted to logically sounding theories. They prefer readings, lectures and having time to think things through. People will ask themselves: 'What is there I can know?'"
      },
      {
        cardtitle: "PRAGMATIST",
        cardundertitle: "Concrete experiencer",
        cardundertitle2: "Reflective observer",
        carddescription: "Reflectors are able to look at things from different perspectives. They are sensitive people and prefer to watch, rather than do. People with this learning style like to gather information and use their own imagination to solve problems and conflicts. They are best at viewing concrete situations from different viewpoints.",
        cardexpandedtitle: "Reflectors are divergers:",
        cardexpandedtext: "People with this learning style perform better in the idea of generating situations, like brainstorming. Reflectors have an interest in culture and like to gather information. They are imaginative, emotional and are interested in people. People with this learning style will ask themselves: 'Why?'"
      },
      {
        cardtitle: "REFLECTOR",
        cardundertitle: "Abstract conceptualiser",
        cardundertitle2: "Active experimenter",
        carddescription: "Pragmatists like to solve problems and find solutions to practical issues. People with this learning style prefer technical tasks and are also less interested in people and their personal aspects. They are best at finding practical uses for theories and ideas. They make decisions by finding solutions to problems.",
        cardexpandedtitle: "Pragmatists are convergers:",
        cardexpandedtext: "People with converging learning styles are more attracted to technology. They like to experiment with new ideas and to work with practical applications. They like to figure out how things work in practise. Pragmatists like facts and effiency. People with this learning style will ask themselves: 'How?'"
      }
    ];
  }

  render() {
    return (
      <SiteCardArea>
        {this.state.map(d => {
          return(
            <SiteCard
              cardtitle={d.cardtitle}
              cardundertitle={d.cardundertitle}
              cardundertitle2={d.cardundertitle2}
              carddescription={d.carddescription}
              cardexpandedtitle={d.cardexpandedtitle}
              cardexpandedtext={d.cardexpandedtext}
            />
          )
        })}
      </SiteCardArea> 
    );
  }
}
