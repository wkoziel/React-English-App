import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import image from '../assets/lessons.svg';
import Button from '../components/Button';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import arrow from '../assets/arrow-green.svg';
import { getLessonSiteData } from '../api/api';
import Loading from '../components/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import transitions from '../helpers/transitions';
import { useGlobalContext } from '../context/global';
import { routes } from '../routes';

const Lessons = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [allLessons, setAllLessons] = useState([]);
   const [userLessons, setUserLessons] = useState([]);
   const [dailyGoal, setDailyGoal] = useState(0);
   const [lastLesson, setLastLesson] = useState({});

   const { username } = useGlobalContext();
   const history = useHistory();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getLessonSiteData(username);
            if (response.data) {
               //FIXME: Usuń
               console.log('Lesson site data: ', response.data);
               setAllLessons(response.data.all_lessons);
               setUserLessons(response.data.all_users_lessons);
               setDailyGoal(response.data.words_to_learn);
               setLastLesson(response.data.last_lesson);
            }
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   const getLessonPercents = (id) => userLessons.find((l) => l.lesson_id === id)?.percentage;

   return (
      <>
         <Navbar active={1} />
         {isLoading ? (
            <Loading />
         ) : (
            <Style className="container">
               <AnimatePresence>
                  <motion.div key="1-frame" {...transitions.opacity} className="small-box box">
                     <h2>Osiągnij swój wyznaczony cel!</h2>
                     <img className="right woman-img" src={image} alt="Kobieta z notatkami" />
                     <h3>
                        Pozostało <span className="green">{dailyGoal}</span> słówek do opanowania
                     </h3>
                  </motion.div>

                  <motion.div key="2-frame" {...transitions.opacity} className="small-box box">
                     <h2>Kontynuuj naukę</h2>
                     <div className="right circle">
                        <h1 className="procent">{lastLesson?.percentage || '0'}%</h1>
                     </div>
                     <div className="bottom button">
                        <Button
                           label={`Lekcja ${lastLesson?.lesson_id + 1 || 1}`}
                           onClick={() => history.push(routes?.singleLesson.replace(':id', lastLesson?.lesson_id))}
                        />
                     </div>
                  </motion.div>

                  {/* BOX 3 */}
                  <motion.div key="3-frame" {...transitions.opacity} className="big-box">
                     <h3>Wszystkie lekcje</h3>
                     <div className="lessons">
                        {allLessons.map((l) => (
                           <Link key={l?.lesson_id} to={`/lesson/${l?.lesson_id}`}>
                              <div className="lesson box">
                                 <h2>{l?.lesson_id + 1}.</h2>
                                 <div className="title">
                                    <h3 className="no-margin">{l?.lesson_name}</h3>
                                    <h5 className="no-margin">{l?.words_count} pojęć</h5>
                                 </div>
                                 <h3 className="end">{getLessonPercents(l?.lesson_id) || '0'}%</h3>
                                 {/*Kolumna z procentami*/}
                                 <img className="end" src={arrow} alt="Arrow right" />
                              </div>
                           </Link>
                        ))}
                     </div>
                  </motion.div>
               </AnimatePresence>
            </Style>
         )}
      </>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 1rem;

   .small-box {
      display: grid;
      grid-template-columns: 5fr 2.5fr;
      grid-template-rows: auto;
      padding: 1rem 1.5rem;
      .right {
         grid-row: span 2;
         margin: auto;
      }
   }

   .small-box:nth-child(2) {
      justify-content: center;
      align-items: center;
      text-align: center;
      div {
         display: flex;
         margin: auto;
      }
   }

   .small-box .woman-img {
      width: 100%;
      height: auto;
   }

   .big-box {
      grid-column: 1 / span 2;
      margin-top: 1.5rem;

      .lessons {
         margin-top: 1.5rem;
         display: flex;
         flex-direction: column;
         gap: 1rem;
      }

      .lesson {
         border-radius: 10px;
         display: grid;
         grid-template-columns: max-content max-content 1fr 50px;
         align-items: center;
         justify-content: flex-start;
         gap: 0 0.5rem;

         .title {
            display: inline-block;
         }

         .end {
            justify-self: end;
         }
      }
   }
`;

export default Lessons;
