import React from 'react';
import '../../Intogen.css';
import './LearningCards.css';
import {withStyles} from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        width: '330px',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&.before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
}) (MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}) (MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

function LearningCards() {

    const [expanded, setExpanded] = React.useState('pandel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className="cardsDiv">
            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange("panel1")}>
                <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                    <Typography className="learningCard">ACTIVISTS <br/><small className="cardsSubTitle">(Concrete experiencer/Active experimenter)</small></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <p>
                            Activists learning style is: „hands-on“. They rely on intuition rather than logic and have a strong preference for „doing“ rather than „thinking“.
                            They use other people’s analysis and take a more practical, experimental approach. 
                            They like new challenges, experiences and take risks.
                            The central focus is on team problem-solving. <br/>
                            <b>Activists are accomodators:</b> <br/>
                            Accomodators tend to rely on other people's information. 
                            They are gut oriented people and don’t like logical analysis.
                            They do not like routine and will take creative risks to see what happens.
                            People with this learning style will ask themselves: <br/>
                            ‚What if?‘
					    </p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel2'} onChange={handleChange("panel2")}>
                <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
                    <Typography className="learningCard">THEORISTS <br/><small className="cardsSubTitle">(Abstract conceptualiser/Reflective observer)</small></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <p>
                            Theorists learning preference involves a logical approach. 
                            Ideas and concepts are more important than people. 
                            People with this learning style want a good and clear explanation rather than a practical opportunity. 
                            They have an understanding of wide-ranging information and organizing it in a clear, logical way.<br/>
                            <b>Theorists are assimilators:</b> <br/>
                            Assimilators are less focused on people and more interested in ideas and abstract concepts.  
                            They are more attracted to logically sounding theories.
                            They prefer readings, lectures and having time to think things through.
                            People with this learning style will ask themselves: <br/>
                            ‚What is there I can know?‘
                        </p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel3'} onChange={handleChange("panel3")}>
                <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
                    <Typography className="learningCard">REFLECTORS <br/><small className="cardsSubTitle">(Concrete experiencer/Reflective observer)</small></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <p>
                            Reflectors are able to look at things from different perspectives. 
                            They are sensitive people and prefer to watch, rather than do. 
                            People with this learning style like to gather information and use their own imagination to solve problems and conflicts.
                            They are best at viewing concrete situations from different viewpoints.<br/>
                            <b>Reflectors are divergers:</b> <br/>
                            People with this learning style perform better in the idea of generating situations, like brainstorming. 
                            Reflectors have an interest in culture and like to gather information. 
                            They are imaginative, emotional and are interested in people. 
                            People with this learning style will ask themselves: <br/>
                            ‚Why?‘
                        </p>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion square expanded={expanded === 'panel4'} onChange={handleChange("panel4")}>
                <AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
                    <Typography className="learningCard">PRAGMATISTS <br/><small className="cardsSubTitle">(Abstract conceptualization/ Active experimenter) </small></Typography>
                </AccordionSummary>
                 <AccordionDetails>
                    <Typography>
                        <p>
                            Pragmatists like to solve problems and find solutions to practical issues. 
                            People with this learning style prefer technical tasks and are also less interested in people and their personal aspects.
                            They are best at finding practical uses for theories and ideas. 
                            They make decisions by finding solutions to problems. <br/>
                            <b>Pragmatists are convergers:</b> <br/>
                            People with converging learning styles are more attracted to technology. 
                            They like to experiment with new ideas and to work with practical applications. 
                            They like to figure out how things work in practise. 
                            Pragmatists like facts and effiency. 
                            People with this learning style will ask themselves: <br/>
                            ‚How?‘
                        </p>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default LearningCards