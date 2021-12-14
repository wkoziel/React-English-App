import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import GoBack from '../components/GoBack';
import LessonTitle from '../components/LessonTitle';
import Navbar from '../components/Navbar';
import { routes } from '../routes';
import { colors } from '../style';
import bird from '../assets/bird.svg';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { getLessonData, getUserLessons } from '../api/api';
import { AnimatePresence, motion } from 'framer-motion';
import transitions from '../helpers/transitions';
import { useGlobalContext } from '../context/global';

const SingleLesson = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [percentage, setPercentage] = useState(0);
   const [lesson, setLesson] = useState({});
   const { id } = useParams();
   const history = useHistory();
   const location = useLocation();
   const { username } = useGlobalContext();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [resLesson, resUser] = await Promise.all([getLessonData(id), getUserLessons(username)]);
            if (resLesson.data && resUser.data) {
               setLesson(resLesson.data);
               const perc = resUser.data.find((l) => l.lesson_id === Number.parseInt(id, 10));
               if (perc) setPercentage(perc.percentage);
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
         <Navbar active={1} />
         <AnimatePresence>
            {isLoading ? (
               <Loading />
            ) : (
               <>
                  <motion.div key="singlelesson" {...transitions.opacity}>
                     <Style className="container page">
                        <div className="side">
                           <GoBack label=" Powrót do lekcji" link={routes.lessons} />
                        </div>
                        <div className="stats box">
                           <div className="text">
                              <h2 className="green">{lesson.words_count}</h2>
                              <h4>Nowych pojęć</h4>
                           </div>
                           <div className="text">
                              <h2 className="purple">{percentage}%</h2>
                              <h4>Poziom opanowania</h4>
                           </div>
                        </div>
                        <div className="side">
                           <LessonTitle label={`${lesson.lesson_name}`} />
                        </div>
                        <div className="lesson box">
                           <h1>
                              Lekcja {lesson.lesson_id + 1} <span className="green">{lesson.lesson_name}</span>
                           </h1>
                           <h4>{lesson.description}</h4>
                           <img src={bird} alt="" />
                        </div>
                        <div className="right-column">
                           <div className="box buttons">
                              <h4>Wybierz sposób nauki:</h4>
                              <Button
                                 label="Fiszki"
                                 onClick={() => history.push(location.pathname + '/flashcards')}
                                 styles={{ width: '100%' }}
                              />
                              <Button
                                 label="Wpisywanie"
                                 onClick={() => history.push(location.pathname + '/typing')}
                                 styles={{ width: '100%' }}
                              />
                              <Button
                                 label="Quiz"
                                 onClick={() => history.push(location.pathname + '/quiz')}
                                 styles={{ width: '100%' }}
                              />
                           </div>
                           <div className="box buttons test">
                              <h4>Rozpocznij test umiejętności:</h4>
                              <Button
                                 label="Rozpocznij test"
                                 whiteArrow
                                 onClick={() => history.push(location.pathname + '/test')}
                                 styles={{ width: '100%' }}
                              />
                           </div>
                        </div>
                     </Style>
                  </motion.div>
               </>
            )}
         </AnimatePresence>
      </>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: 0.3fr auto;
   gap: 1rem 1rem;

   .side {
      grid-column: span 2;
      display: flex;
      margin: auto;
   }

   .stats {
      grid-column: span 8;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: ${colors.gray4};
      .text {
         display: flex;
         align-items: center;
      }
      h4 {
         font-weight: normal;
      }
      h2 {
         margin-right: 1rem;
      }
   }

   .lesson {
      grid-column: span 8;
      align-self: center;
      display: grid;
      grid-template-rows: 0.3fr 0.7fr;
      position: relative;
      height: 100%;

      h1 {
         text-transform: capitalize;
         align-self: center;
         text-align: center;
      }

      h4 {
         color: ${colors.gray3};
      }

      img {
         position: absolute;
         bottom: 0;
         right: 10%;
      }
   }

   .right-column {
      grid-column: span 4;
      display: grid;
      grid-template-rows: 65% 35%;

      .buttons {
         padding: 1rem 2rem;
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         button {
            padding: 0.5rem;
            color: ${colors.black};
         }
      }
      .test {
         margin-top: 1rem;
      }
      .test button {
         color: ${colors.white};
         background: ${colors.green};
      }
   }
`;

export default SingleLesson;
