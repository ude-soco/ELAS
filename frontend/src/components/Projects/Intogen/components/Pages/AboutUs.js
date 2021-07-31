import React, { useState } from 'react';
import '../../Intogen.css'
import img2 from '../Assets/unilogo.png'
import Footer from '../Reusable/Footer'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import Icons from '../Reusable/Icons';

export default function AboutUs() {
    const [click, setClick] = useState(false);
    const closeMobileMenu = () => setClick(false);

    return (
        <>
            <hr class="border2" data-content="About Us"/>
            <div className="page-container">
                <span className="subTitle">Welcome to <b>IntoGen </b></span><br/>
                <hr class="border4"/>
                <p className="text-container">
                    IntoGen was originally programmed by students from University Duisburg-Essen's ISE program Computer Engineering department (CE) major (Intelligent Networked Systems).
                    The web application was programmed under the supervision of Prof. Dr. Mohamed Amine Chatti. <br/> <br/>
                    To provide this application, the students needed to collect data from other ISE students, for which they used Sample Surveys method. <br/>
                    You can see the survey questions under <Link to="/findyourtype" className="aboutUsFindType" onClick={closeMobileMenu}>Find Your Type</Link>. <br/>
                    Each participants information will be handled anonymously. The data will be used for visual analytics to help students find their learning styles and check their suggested courses.
                    Teachers and organisations can also use the service to improve learning experience of students later on when the web service is developed. 
                    <hr class="border1"/>
                    <h1 className="aboutusSub">Our new mission:</h1>
                    <p className="newMission">
                        IntoGen was later on updated by Willi Dick, Dilara Ince and Clarissa Kümhof (Komedia bachelor students). Our goal was to implement Intogen into the ELAS platform and improve this web application. <br/>
                        Prof. Dr. Mohamed Amine Chatti was also the supervisor in this project with the special help of Shoeb Joarder.
                    </p>
                </p>
                <img className="image2" src={img2} alt="ELAS Logo" />
                <div className="iconsAboutUs">
                    <Icons/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

