import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes';
import { colors, fonts } from '../style';
import { navLinks } from '../constants/data';
import { useGlobalContext } from '../context/global';
import MaleAvatar from '../assets/avatar-male.svg';
import arrowDown from '../assets/arrow-down.svg';

const Navbar = ({ logo = 'Logo', active = null }) => {
   const { isAuth, logout, username } = useGlobalContext();
   const [showDropdown, setShowDropdown] = useState(false);
   return (
      <Style>
         <div className="flex">
            <Link to={routes.home}>
               <div className="logo">{logo}</div>
            </Link>
            <ul className="links">
               {navLinks.map((link, index) => (
                  <li key={index} className={`${active === index && 'active'}`}>
                     <Link to={link.route}>
                        <p className="link">{link.name}</p>
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
         {isAuth ? (
            <div className="left">
               <h5>{username}</h5>
               <img className="avatar" src={MaleAvatar} alt="Ikona użytkownika" />
               <div className="dropdown">
                  <button onClick={() => setShowDropdown(!showDropdown)} className="dropbtn">
                     <img className="arrow" src={arrowDown} alt="" />
                  </button>
                  {showDropdown && (
                     <div className="dropdown-content">
                        <div className="tip" />
                        <Link to="#">Mój profil</Link>
                        <Link to="#">Edytuj profil</Link>
                        <Link to="#" onClick={() => logout()}>
                           Wyloguj
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         ) : (
            <div className="flex">
               <Link to={routes.signUp}>
                  <div className="btn">
                     <p className="link">Zarejestruj się</p>
                  </div>
               </Link>
               <Link to={routes.signIn}>
                  <p className="link">Zaloguj się</p>
               </Link>
            </div>
         )}
      </Style>
   );
};

const Style = styled.nav`
   font-family: ${fonts.nova};
   color: ${colors.white};
   background-color: ${colors.green};
   display: flex;
   justify-content: space-between;
   padding: 0.2rem 3rem;

   * {
      margin-bottom: 0;
   }

   .flex {
      display: flex;
      align-items: center;
      gap: 2.5rem;
   }

   .left {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-right: 1.5rem;

      h5 {
         margin: 0;
      }
   }

   .logo {
      font-size: 3rem;
   }

   .link {
      font-size: 1.2rem;
   }

   a {
      text-decoration: none;
      color: ${colors.white};
   }

   .links {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 1rem;
   }

   .active {
      padding-bottom: 3px;
      border-bottom: 2px ${colors.white} solid;
   }

   .btn {
      background-color: ${colors.white};
      padding: 0.2rem 1rem;
      color: #3aceaa;
      border-radius: 2px;

      &:hover {
         transform: translateY(-2px);
      }

      &:active {
         transform: translateY(2px);
      }
   }

   .avatar {
      height: 40px;
      width: 40px;
      background: none;
   }

   .arrow {
      height: 30px;
      width: 30px;
   }

   .dropbtn {
      color: white;
      background: none;
      border: none;
      cursor: pointer;
   }
   .dropdown {
      position: relative;
      display: inline-block;
   }

   .dropdown-content {
      position: absolute;
      transform: translateX(-50%);
      left: 15px;
      top: 50px;
      background-color: white;
      min-width: 160px;
      border-radius: 10px;
      z-index: 1;
   }

   .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
   }

   .tip {
      background: white;
      width: 10px;
      height: 10px;
      position: absolute;
      top: -10px;
      right: 75px;
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
   }
`;

export default Navbar;
