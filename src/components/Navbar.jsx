import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes';
import { colors, fonts } from '../style';
import { navLinks } from '../constants/data';
import { useGlobalContext } from '../context/global';
import { getUserPhoto } from '../api/api';
import Duck from '../assets/duck.svg';
import arrowDown from '../assets/arrow-down.svg';

const Navbar = ({ logo = 'Duckling', active = null }) => {
   const [userPhoto, setUserPhoto] = useState({});
   const { isAuth, logout, username } = useGlobalContext();
   const [showDropdown, setShowDropdown] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const responseUser = await getUserPhoto(username);
            if (responseUser.data) setUserPhoto(responseUser.data.photo);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      if (username) fetchData();
   }, [username]);

   return (
      <Style>
         <div className="flex">
            <Link to={routes.home} className="logo-duck">
               <div className="logo">
                  <img src={Duck} alt="Kaczka" />
                  {logo}
               </div>
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
               {!isLoading && (
                  <>
                     <div className="dropdown">
                        <button onClick={() => setShowDropdown(!showDropdown)} className="dropbtn">
                           <h5>{username}</h5>
                           <img className="avatar" src={userPhoto} alt="" />
                           <img className="arrow" src={arrowDown} alt="" />
                        </button>
                        {showDropdown && (
                           <div className="dropdown-content">
                              <div className="tip" />
                              <Link to={routes.profile}>Mój profil</Link>
                              <Link to={routes.editProfile}>Edytuj profil</Link>
                              <Link to="#" onClick={() => logout()}>
                                 Wyloguj
                              </Link>
                           </div>
                        )}
                     </div>
                  </>
               )}
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
   padding: 0 5rem 0 1.5rem;

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

      h5 {
         margin: 0;
      }
   }

   .logo {
      font-size: 3rem;
      display: flex;
      align-items: center;
   }

   .link {
      font-size: 1.2rem;
      transition: all 0.3s;

      &:hover {
         color: ${colors.yellow};
      }
   }

   .active {
      background: ${colors.yellow};
      padding: 0.4rem 1rem;
      border-radius: 10px;
      pointer-events: none;
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

   .btn {
      background-color: ${colors.white};
      padding: 0.2rem 1rem;
      color: #3aceaa;
      border-radius: 2px;
      transition: all 0.3s;

      &:hover {
         transform: translateY(-2px);
      }

      &:active {
         transform: translateY(2px);
      }
   }

   .avatar {
      height: 45px;
      width: 45px;
      background: none;
      border-radius: 50%;
      border: 2px solid ${colors.white};
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
      display: flex;
      align-items: center;
      gap: 1rem;
   }
   .dropdown {
      position: relative;
      display: inline-block;
   }

   .dropdown-content {
      position: absolute;
      transform: translateX(-50%);
      right: -140px;
      top: 50px;
      background-color: white;
      min-width: 160px;
      border-radius: 10px;
      z-index: 1;
      border: 1px solid ${colors.gray1};
   }

   .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;

      &:hover {
         font-weight: bold;
      }
   }

   .tip {
      background: white;
      width: 10px;
      height: 10px;
      position: absolute;
      top: -10px;
      right: 70px;
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
   }
`;

export default Navbar;
