import React, { useState, useEffect } from 'react';
import LearningCards from '../Cards/LearningCards'
import './Results.css';
import ResultsDiagram from './ResultsDiagram';
import ResultsCourses from './ResultsCourses';
import ResultsWeightage from './ResultsWeightage';
import data from '../Diagrams/Data/out'

export default function Results({ dataR }) {
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState([]);
    const [courses, setCourses] = useState([]);
    const [coursesPercentage, setCoursesPercentage] = useState([]);
    const [weightage, setWeightage] = useState([]);

    useEffect(() => {
        const values = Object.values(dataR)
        console.log(values)
        
        const ac = Object.values(values[0])
        let Activist = 0
        ac.forEach(d => {
            Activist = Activist + d
        })

        const ref = Object.values(values[1])
        let Reflector = 0
        ref.forEach(d => {
            Reflector = Reflector + d
        })

        const theo = Object.values(values[2])
        let Theorist = 0
        theo.forEach(d => {
            Theorist = Theorist + d
        })

        const prag = Object.values(values[3])
        let Pragmatist = 0
        prag.forEach(d => {
            Pragmatist = Pragmatist + d
        })
 
        let resultsLearningStyle = []
        resultsLearningStyle.push(Activist)
        resultsLearningStyle.push(Reflector)
        resultsLearningStyle.push(Theorist)
        resultsLearningStyle.push(Pragmatist)

        console.log(resultsLearningStyle)
        setResults(resultsLearningStyle)
        setCategory(['Activist','Reflector','Theorist','Pragmatist'])

        let relevantCourses = []
        for(let i = 0; i<data.length; i++) {
            if (values[5] === data[i].Study_program) {
                if(data[i].Subject1 !== "INVALID" && data[i].Subject2 !== "INVALID") {
                    relevantCourses.push(data[i].Subject1)
                    relevantCourses.push(data[i].Subject2)
                }
            }
        }

        let suggestedCourses = []
        let simAct = []
        let simRefl = []
        let simTheo = []
        let simPrag = []

        for(let i = 0; i<data.length; i++) {
            if(data[i].Subject1 !== "INVALID" || data[i].Subject2 !== "INVALID") {
                if(data[i].Activist === resultsLearningStyle[0]) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simAct.push(100 - Math.abs(data[i].Activist - resultsLearningStyle[0]));
                } else if (data[i].Activist === (resultsLearningStyle[0] + 10) || data[i].Activist === (resultsLearningStyle[0] - 10)) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simAct.push(100 - Math.abs(data[i].Activist - resultsLearningStyle[0]));
                } else if (data[i].Activist === (resultsLearningStyle[0] + 20 || data[i].Activist === (resultsLearningStyle[0] - 20))) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simAct.push(100 - Math.abs(data[i].Activist - resultsLearningStyle[0]));
                } 
                
                if(data[i].Reflector === resultsLearningStyle[1]) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simRefl.push(100 - Math.abs(data[i].Reflector - resultsLearningStyle[1]));
                } else if (data[i].Reflector === (resultsLearningStyle[1] + 10) || data[i].Reflector === (resultsLearningStyle[1] - 10)) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simRefl.push(100 - Math.abs(data[i].Reflector - resultsLearningStyle[1]));
                } else if (data[i].Reflector === (resultsLearningStyle[1] + 20) || data[i].Reflector === (resultsLearningStyle[1] - 20)) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simRefl.push(100 - Math.abs(data[i].Reflector - resultsLearningStyle[1]));
                } 

                if(data[i].Theorist === resultsLearningStyle[2]) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simTheo.push(100 - Math.abs(data[i].Theorist - resultsLearningStyle[2]));
                } else if (data[i].Theorist === (resultsLearningStyle[2] + 10) || data[i].Reflector === (resultsLearningStyle[1] - 10)) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simTheo.push(100 - Math.abs(data[i].Theorist - resultsLearningStyle[2]));
                } else if (data[i].Theorist === (resultsLearningStyle[2] + 20) || data[i].Reflector === (resultsLearningStyle[1] - 20)) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simTheo.push(100 - Math.abs(data[i].Theorist - resultsLearningStyle[2]));
                } 

                if(data[i].Pragmatist === resultsLearningStyle[3]) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simPrag.push(100 - Math.abs(data[i].Pragmatist - resultsLearningStyle[3]));
                } else if (data[i].Pragmatist === (resultsLearningStyle[3] + 10) || data[i].Reflector === (resultsLearningStyle[1] - 10)) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simPrag.push(100 - Math.abs(data[i].Pragmatist - resultsLearningStyle[3]));
                } else if (data[i].Pragmatist === (resultsLearningStyle[3] + 20) || data[i].Reflector === (resultsLearningStyle[1] - 20)) {
                        suggestedCourses.push(data[i].Subject1)
                        suggestedCourses.push(data[i].Subject2)
                        simPrag.push(100 - Math.abs(data[i].Pragmatist - resultsLearningStyle[3]));
                } 
            } 
        }

        // compares relevant courses with all courses that match the learning style
        var suitableCourses = relevantCourses.filter(function(val){
            return suggestedCourses.indexOf(val) !== -1;
        });

        // deletes duplicates 
        let uniqueSuitableCourses = [...new Set(suitableCourses)];

        let position = uniqueSuitableCourses.indexOf('INVALID');
        uniqueSuitableCourses.splice(position, 1);

        setCourses(uniqueSuitableCourses)

        // Averages
        let average = []
        for(let i = 0; i<uniqueSuitableCourses.length; i++) {
            let sum = simAct[i] + simRefl[i] + simTheo[i] + simPrag[i]
            average.push(sum/4)
        }
        setCoursesPercentage(average)
        
        average.sort((a, b) => (a > b) ? -1 : 1)

        // Weightage
        let weightageCounter = 0
        let weightage = []
        for(let z = 0; z<uniqueSuitableCourses.length; z++) {
            weightageCounter = 0
            for(let i = 0; i<data.length; i++) {
                if(uniqueSuitableCourses[z] === data[i].Subject1 || uniqueSuitableCourses[z] === data[i].Subject2) {
                    weightageCounter += 1
                }
            }
            weightage.push(weightageCounter)
        }
        setWeightage(weightage)

    }, []);

    return (  
        <> 
            <div className="leftSide">
                <h4>Results of your test</h4>
                <div className="textDescription">
                    Following chart shows your preferred 
                    learning styles and high percentage 
                    of type which reflects your general 
                    approach towards learning.
                </div>
                <div className="diagram-container">
                    {results.length !== 0 ? <> 
                        <ResultsDiagram data={results} categories={category} /> 
                    </> : <> </>}
                </div>
                <h4 className="titles">Suggested courses:</h4>
                <div className="textDescription">
                    Following courses are estimated by comparing your style 
                    scores with student's style scores present in that specific 
                    course. High percentage courses are those courses which have 
                    more similar learners like you. <br/> <br/>
                    Note: This estimation does not guarantee that you will 
                    score a good GPA in the courses, it suggests that you may 
                    enjoy studying the course, taking your learning styles in consideration.  
                </div>
                <div className="diagram-container">
                    <ResultsCourses courses={courses} percentages={coursesPercentage}/>
                </div>
                <h4 className="titles">Suggested courses weightage:</h4>
                <div className="textDescription">
                    Suggested courses percentages 
                    depend on number of students in that course, 
                    which means that if there is only one student in a course 
                    then the percentage will obviously be high but the weightage will be low.  
                </div>
                <div className="diagram-container">
                    <ResultsWeightage courses={courses} weightages={weightage} />
                </div>
            </div>
            <div className="rightSide">
                <h4>Kolb's Learning Styles</h4>
                <hr class="border1"/>
                <div className="cards1">
                    <LearningCards/>
                </div>
            </div>       
        </>
    );
}