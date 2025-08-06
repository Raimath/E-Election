import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../context/context';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { setisLogedin } = useContext(Context);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="navbar">
      <div className="logo">MassMaster</div>

      <div className="responsive-icons" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={menuOpen ? faXmark : faBars}
          size="xl"
          className="menu-icon"
        />
      </div>

      <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>

        <li><NavLink to="/home" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/elections" onClick={() => setMenuOpen(false)}>Elections</NavLink></li>
        <li><NavLink to="/participate" onClick={() => setMenuOpen(false)}>Participate</NavLink></li>


        {localStorage.getItem('id') ? (
          <>
            <li><NavLink to="/profile/myProfile" onClick={() => setMenuOpen(false)} >Profile</NavLink></li>
            <li><NavLink to="/" onClick={() => {
              setisLogedin(false);
              localStorage.removeItem('id'); setMenuOpen(false);
            }}></NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/voterLogin" onClick={() => setMenuOpen(false)}>Voter Login</NavLink></li>
            <li><NavLink to="/candidatLogin" onClick={() => setMenuOpen(false)}>candidate Login</NavLink></li>
          </>
        )}



      </ul>
    </div>
  );
};
