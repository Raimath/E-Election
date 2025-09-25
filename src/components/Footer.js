import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";


export const Footer = () => {
    return (
        <>
            <section className="section footer-section">
                <div className="container footer-container flex" >
                     <div className='footer-elements '>
                        
                        <div className='navigation'>
                            <div className='footer-heading'>About</div>
                            <div className=''>The system enables online voting, candidate management, and real-time results. It is built to ensure fairness, security, and accessibility for all users.</div>
                            
                        </div>
                        <div className='navigation flex'>
                            <div className='footer-heading'>Navigation</div>
                            <ul className='footer-navlink flex'>
                                <li><Link to="/home" >Home</Link></li>
                                <li><Link to="/photos?type=candid" >Photos</Link></li>
                                <li><Link to="/videos" >Videos</Link></li>
                                <li><Link to="/services" >Services</Link></li>
                                <li><Link to="/about" >About Us</Link></li>
                                <li><Link to="/contact" >Contact</Link></li>
                            </ul>
                        </div>
                        <div className=' navigation query flex'>
                            <div className='footer-heading'>Have a Query</div>
                            <ul className='query-ul flex'>

                                <li className='link flex'>
                                    <div className='icon'><FontAwesomeIcon icon={faPhone} size="xl" /></div>
                                    <Link to="tel:+9170197 50802" target="_blank" rel="noopener noreferrer">+91 7019750802</Link>
                                </li>
                                <li className='link flex'>
                                    <div className='icon'><FontAwesomeIcon icon={faEnvelope} size="xl" /></div>
                                    <Link to="mailto:massmasterweddings@gmail.com" target="_blank" rel="noopener noreferrer">massmasterweddings@gmail.com</Link>
                                </li>
                                <li className='link flex'>
                                    <div className='icon'><FontAwesomeIcon icon={faLocationDot} size="xl" /></div>
                                    <Link to="https://maps.app.goo.gl/DRyk3KhtDUf9YJ1C8" target="_blank" rel="noopener noreferrer">Islampur Gangavathi 523235</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='copyright flex'>
                        <p> copyright  &copy; all rights reserved  by Raimath Ali </p>
                        <p> this website is developed by <Link to="https://www.instagram.com/raimath420" target="_blank" rel="noopener noreferrer">Raimath</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}
