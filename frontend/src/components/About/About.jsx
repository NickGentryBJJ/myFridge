import './About.css'
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai';
import teamphoto from './Images/teamphoto.png';



export default function About() {

    return (
        <div className='about-me-page'>
            <div className='team-image-container'>
                <div id='teamtext'>
                    The myFridge Team
                </div>
                <img src={teamphoto} alt="Team" />
            </div>
            <div className='team-links'>
                <div className="about-item">
                    <div className="text-box">
                        {/* Text */}
                        <h3>Nick Hein</h3>
                        <div className='icon-container'>
                            <a target="_blank" href="https://github.com/LetsGitFunky" className="icon-link">
                                <AiFillGithub className="github-icon" />
                            </a>
                            <a target="_blank" href="https://www.linkedin.com/in/nickjhein/" className="icon-link">
                                <AiFillLinkedin className="linkedin-icon" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="about-item">
                    <div className="text-box">
                        {/* Text */}
                        <h3>Hanna Darwish</h3>
                        <div className='icon-container'>
                            <a target="_blank" href="https://github.com/hannadarwish" className="icon-link">
                                <AiFillGithub className="github-icon" />
                            </a>
                            <a target="_blank" href="https://www.linkedin.com/in/hanna-darwish-89a34777/" className="icon-link">
                                <AiFillLinkedin className="linkedin-icon" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="about-item">
                    <div className="text-box">
                        {/* Text */}
                        <h3>Nick Gentry</h3>
                        <div className='icon-container'>
                            <a target="_blank" href="https://github.com/NickGentryBJJ" className="icon-link">
                                <AiFillGithub className="github-icon" />
                            </a>
                            <a target="_blank" href="https://www.linkedin.com/in/nicholas-gentry-2721451b2/" className="icon-link">
                                <AiFillLinkedin className="linkedin-icon" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="about-item">
                    <div className="text-box">
                        {/* Text */}
                        <h3>Matthew Montejo</h3>
                        <div className='icon-container'>
                            <a target="_blank" href="https://github.com/montejododger" className="icon-link">
                                <AiFillGithub className="github-icon" />
                            </a>
                            <a target="_blank" href="https://www.linkedin.com/in/matthew-m-640905239/" className="icon-link">
                                <AiFillLinkedin className="linkedin-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}