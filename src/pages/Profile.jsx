import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GoBack from '../components/GoBack';
import Chart from 'chart.js/auto'; //eslint-disable-line
import { Bar } from 'react-chartjs-2';
import { colors } from '../style';
import { AnimatePresence } from 'framer-motion';
import transitions from '../helpers/transitions';
import { motion } from 'framer-motion';
import HeaderImage from '../assets/profile.svg';
import Enby from '../assets/avatar-different.svg';
import Female from '../assets/avatar-female.svg';
import Male from '../assets/avatar-male.svg';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { useEffect } from 'react/cjs/react.development';
import { getUser, getUsersWeek } from '../api/api';
import { useGlobalContext } from '../context/global';
import Loading from '../components/Loading';

const Profile = () => {
   const [user, setUser] = useState({});
   const [userWeek, setUserWeek] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const { username } = useGlobalContext();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [responseUser, responseWords] = await Promise.all([getUser(username), getUsersWeek(username)]);
            if (responseUser.data && responseWords.data) {
               //FIXME: Usuń
               console.log('User response data: ', responseUser.data);
               console.log('User week response data: ', responseWords.data);
               setUser(responseUser.data);
               setUserWeek(responseWords.data);
            }
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   const days = ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];

   const getUserImg = () => {
      if (user.gender === 'M') return Male;
      if (user.gender === 'F') return Female;
      if (user.gender === 'N') return Enby;
   };

   return (
      <AnimatePresence>
         <Navbar active={3} />
         <motion.div key={new Date().getTime()} {...transitions.opacity}>
            {isLoading ? (
               <Loading />
            ) : (
               <Style className="page container">
                  <div className="goback">
                     <GoBack label="Powrót" />
                  </div>
                  <div className="profile white-box">
                     <div className="header">
                        <img src={getUserImg()} alt="Awatar użytkownika" className="userImg" />
                        <div>
                           <h1>
                              {user?.name} {user?.surname}
                           </h1>
                           <h4>@{user?.login}</h4>
                           <h5>{user?.created.slice(0, -12)}</h5>
                        </div>
                        <img src={HeaderImage} alt="Mężczyzna przy tablicy" className="headerImg" />
                     </div>
                     <div className="achivements">
                        <Link to={routes.editProfile}>
                           <span className="edit">Edytuj profil</span>
                        </Link>
                     </div>
                  </div>
                  <div className="stats">
                     <h5>Twoje statystyki</h5>
                     <div className="white-box">
                        <h3 className="green">135</h3>
                        <h5>Poznanych pojęć</h5>
                     </div>
                     <div className="white-box">
                        <h3 className="yellow">15</h3>
                        <h5>Przerobionych lekcji</h5>
                     </div>
                     <div className="white-box">
                        <h3 className="purple">28</h3>
                        <h5>Zrobionych powtórek</h5>
                     </div>
                  </div>
                  <div className="thisweek">
                     <h5>Twój tydzień</h5>
                     <div className="white-box">
                        <Bar
                           data={{
                              labels: Object.keys(userWeek).map((d) => days[new Date(d).getDay()]),
                              datasets: [
                                 {
                                    label: '',
                                    data: Object.values(userWeek).map((d) => d),
                                    backgroundColor: colors.green,
                                    borderRadius: 20,
                                    borderSkipped: false,
                                    barThickness: 10,
                                    order: 0,
                                 },
                                 {
                                    label: '',
                                    data: Array(7).fill(user.daily_goal),
                                    order: 1,
                                    type: 'line',
                                    borderColor: colors.green,
                                    borderDash: [2, 8],
                                    pointRadius: 0,
                                 },
                              ],
                           }}
                           options={{
                              plugins: {
                                 legend: {
                                    display: false,
                                 },
                                 tooltip: {
                                    enabled: false,
                                 },
                              },
                              scales: {
                                 x: {
                                    grid: {
                                       display: false,
                                    },
                                 },
                                 y: {
                                    grid: {
                                       display: true,
                                    },
                                 },
                              },
                           }}
                        />
                     </div>
                  </div>
               </Style>
            )}
         </motion.div>
      </AnimatePresence>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: 0.7fr 0.3fr;
   gap: 1rem 1rem;
   grid-template-rows: auto 1fr 1fr;
   height: 90vh;

   .goback {
      grid-column: span 2;
   }

   .profile {
      grid-row: span 2;
      padding: 0;
   }
   .header {
      height: 250px;
      position: relative;
      padding: 1rem;
      background: rgba(20, 223, 176, 0.795);
      border-radius: 20px 20px 0 0;
      display: grid;
      grid-template-columns: 0.2fr 0.8fr;
      align-items: center;
      justify-items: start;
      clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
      .userImg {
         width: 150px;
         height: 150px;
         justify-self: center;
         border: 0.5rem solid ${colors.white};
         border-radius: 50%;
         background: white;
      }

      .headerImg {
         position: absolute;
         right: 5rem;
         bottom: 15%;
      }

      h1 {
         margin: 0;
      }

      h4 {
         color: ${colors.white};
         margin: 0;
      }
      h5 {
         color: ${colors.white};
         margin: 0;
         font-weight: normal;
      }
   }

   .achivements {
      position: relative;

      .edit {
         position: absolute;
         top: -2rem;
         right: 1rem;
         text-decoration: underline;
         color: ${colors.green};
         font-weight: bold;
      }
   }

   .stats {
      & > div {
         margin-bottom: 0.5rem;
         display: grid;
         grid-template-columns: 0.25fr 0.75fr;
         align-items: center;
         padding: 0.75rem 1rem;

         h3 {
            margin: 0;
            text-align: center;
         }

         h5 {
            font-weight: normal;
         }
      }
   }

   .thisweek {
      height: 100%;
      & > div {
         display: flex;
         align-items: center;
         height: 82%;
      }
   }
`;

export default Profile;
