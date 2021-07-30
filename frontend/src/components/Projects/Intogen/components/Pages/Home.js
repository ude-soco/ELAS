import React, { useState } from 'react';
import '../../Intogen.css'
import Footer from '../Reusable/Footer'
import img1 from '../Assets/learning_styles.png';
import Icons from '../Reusable/Icons';
import { AppContainer } from '../Cards/AppContainer';
import {Link, BrowserRouter as Router} from 'react-router-dom';

export default function Home() {
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <hr class="border2" data-content="Home"/>
            <div className="page-container">
                    <span className="subTitle">Welcome to <b>IntoGen </b></span><br/>
                    <hr class="border4"/>
                    <p className="text-container">
                        IntoGen is David Kolb's research based web service, which helps ISE students of the University Duisburg-Essen
                        to identify their preferred Learning Styles. The Learning style's data will be used to provide an overview on the basis of their nationalities and education.
                        After completing the survey, students are able to see suggested courses they might like to study based on their Learning Style. <br/><br/>
                        Following datasets are included: <br/>
                        1 - Nationality <br/>
                        2 - Education<br/>
                        3 - Course suggestion based on your learning style (<Link to="/findyourtype" className="aboutUsFindType" onClick={closeMobileMenu}>Find Your Type</Link>)
                    </p>
                <img className="image" src={img1} alt="learning styles" />
                <hr class="border1"/>
                <b className="descriptions">Learn more about Kolb's Learning Styles:</b>
             
                <div className="Cards"> 
                    <AppContainer />
                </div>
                <Icons/>
            </div>
            <Footer /> 
        </>
    )
}