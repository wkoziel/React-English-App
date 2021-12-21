import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { fetchUserProfile, getUser, getUsersWeek } from '../api/api';
import { useGlobalContext } from '../context/global';
import Loading from '../components/Loading';
import { days, tempAchivements } from '../constants/data';
import CountUp from 'react-countup';
import Achivement from '../assets/achivement.svg';

const Profile = () => {
   const [user, setUser] = useState({});
   const [userWeek, setUserWeek] = useState([]);
   const [userStats, setUserStats] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   const { username } = useGlobalContext();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetchUserProfile(username);
            if (response.data) {
               setUser(response.data.user);
               setUserWeek(response.data.daily_words);
               setUserStats(response.data.stats);
            }
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   return (
      <>
         <Navbar active={3} />
         {isLoading ? (
            <Loading />
         ) : (
            <AnimatePresence>
               <motion.div {...transitions.opacity} key="profile-1">
                  <div style={{ margin: '0.5rem 0 0.25rem 5rem' }}>
                     <GoBack label="Powrót" />
                  </div>
                  <Style className="page container">
                     <div className="profile white-box">
                        <div className="header">
                           <img src={user.photo} alt="Awatar użytkownika" className="userImg" />
                           <div>
                              <h1>
                                 {user?.name} {user?.surname}
                              </h1>
                              <h4>@{user?.login}</h4>
                              <h5>Dołączono: {new Date(user?.created).toLocaleDateString()}</h5>
                           </div>
                        </div>
                        <div className="achivements">
                           <Link className="edit" to={routes.editProfile}>
                              <span>Edytuj profil</span>
                           </Link>
                           {tempAchivements.map((a, i) => (
                              <div
                                 className="achivement"
                                 style={{ background: `url(${Achivement}) 100% 50% no-repeat ${colors.background}` }}
                              >
                                 <div>
                                    <h3 className="green">{a.title}</h3>
                                    <p>{a.desc}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="right">
                        <div className="stats">
                           <h5>Twoje statystyki</h5>
                           <div className="white-box">
                              <h3 className="green">
                                 <CountUp end={userStats?.words_count} duration={2} />
                              </h3>
                              <h5>Poznanych pojęć</h5>
                           </div>
                           <div className="white-box">
                              <h3 className="yellow">
                                 <CountUp end={userStats?.lessons_count} duration={2} />
                              </h3>
                              <h5>Przerobionych lekcji</h5>
                           </div>
                           <div className="white-box">
                              <h3 className="purple">
                                 <CountUp end={userStats?.repeats_count} duration={2} />
                              </h3>
                              <h5>Zrobionych powtórek</h5>
                           </div>
                        </div>
                        <div className="thisweek">
                           <h5>Twój tydzień</h5>
                           <div className="white-box">
                              <Bar
                                 height={250}
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
                                    maintainAspectRatio: true,
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
                                    responsive: true,
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                  </Style>
               </motion.div>
            </AnimatePresence>
         )}
      </>
   );
};

const Style = styled.div`
   display: flex;
   width: 90%;
   gap: 2rem;
   justify-content: space-between;

   .profile {
      grid-row: span 2;
      padding: 0;
      width: 100%;
   }
   .header {
      height: 250px;
      position: relative;
      padding: 1rem;
      border-radius: 20px 20px 0 0;
      display: grid;
      grid-template-columns: 0.2fr 0.8fr;
      align-items: center;
      justify-items: start;
      clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%);
      background: url(${HeaderImage}) 90% 50% no-repeat rgba(20, 223, 176, 0.795);

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
      margin-top: 3rem;
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 1rem 1rem;
      padding: 0 2rem 2rem;

      .achivement {
         border-radius: 10px;
         display: flex;
         align-items: center;
         background-color: ${colors.background};
         padding: 0 1rem;
         position: relative;
         min-height: 165px;
         & > * {
            background-color: ${colors.background};
         }
         & > div {
            width: 60%;
         }
      }
      .edit {
         position: absolute;
         top: -4rem;
         right: 1rem;
         text-decoration: underline;
         color: ${colors.green};
         font-weight: bold;
      }
   }

   .right {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
   }

   .stats {
      max-width: 400px;
      margin-bottom: 2rem;
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
      max-width: 400px;
      & > div {
         display: flex;
         align-items: center;
      }
   }
`;

export default Profile;
