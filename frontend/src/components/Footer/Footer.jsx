
import './Footer.css';
import {AiFillGithub} from 'react-icons/ai';

export default function Footer() {

    return (
        <div className='footer'>
                    <span className="footer-text">
                        Copyright &copy; 2023 myFridge
                    </span>
                    <a target="_blank" href="https://github.com/LetsGitFunky/myFridge" className="icon-link">
                        <AiFillGithub className="github-icon" />
                    </a>
        </div>
    )
}