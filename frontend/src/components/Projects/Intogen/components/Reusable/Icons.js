import React from 'react';
import { IconContext } from "react-icons";
import { FaGithub, FaYoutube } from "react-icons/fa";
import './Icons.css';

export default function Icons() {
    return(
        <div className="links">
            <div class="link">
                <div class="icon">
                    <a className="hoverLink" href="https://www.youtube.com/watch?v=HBahnBGqnn4">
                        <IconContext.Provider value={{ className: "youtubeIcon" }}>
                            <div>
                                <FaYoutube/>
                            </div>
                        </IconContext.Provider>
                    </a>
                </div>
                <div class="textIcons">
                    <h4>Advertisement Video</h4>
                </div>
            </div>

            <div class="link">
                <div class="icon">
                    <a className="hoverLink" href="https://www.youtube.com/watch?v=xgwdKz1TzuY">
                        <IconContext.Provider value={{ className: "youtubeIcon" }}>
                            <div>
                                <FaYoutube/>
                            </div>
                        </IconContext.Provider>
                    </a>
                </div>
                <div class="textIcons">
                    <h4>Demo</h4>
                </div>
            </div>

            <div class="link">
                <div class="icon">
                    <a className="hoverLink" href="https://github.com/ude-soco/ELAS/tree/main/frontend/src/components/Projects/Intogen">
                        <IconContext.Provider value={{ className: "githubIcon" }}>
                            <div>
                                <FaGithub/>
                            </div>
                        </IconContext.Provider> 
                    </a>
                </div>
                <div class="textIcons">
                    <h4>Link to GitHub</h4>
                </div>
            </div>
        </div>
    )
}