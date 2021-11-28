import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../routes';
import { colors, fonts } from '../style';

const links = [
   { name: 'Strona główna', route: routes.home },
   { name: 'Lekcje', route: routes.lessons },
   { name: 'Powtórka', route: routes.repeat },
   { name: 'Profil', route: routes.profile },
];

const Navbar = ({ logo = 'Logo', active = null }) => {
   return (
      <Style>
         <div className="flex">
            <Link to={routes.home}>
               <div className="logo">{logo}</div>
            </Link>
            <ul className="links">
               {links.map((link, index) => (
                  <li key={index} className={`${active === index && 'active'}`}>
                     <Link to={link.route}>
                        <p className="link">{link.name}</p>
                     </Link>
                  </li>
               ))}
            </ul>
         </div>
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
`;

export default Navbar;
