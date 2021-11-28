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
import { getLessonData } from '../api/api';

const SingleLesson = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [lesson, setLesson] = useState({});
   const { id } = useParams();
   const history = useHistory();
   const location = useLocation();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getLessonData(id);
            if (response.data) setLesson(response.data);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []);

   return (
      <>
         <Navbar active={1} />
         <Style className="container page">
            {isLoading ? (
               <Loading />
            ) : (
               <>
                  <GoBack label=" Powrót do lekcji" link={routes.lessons} />
                  <div className="stats box">
                     <div>
                        <h3>
                           <strong className="green">25 </strong>
                           Nowych pojęć
                        </h3>
                     </div>
                     <div>
                        <h3>
                           <strong className="purple">15% </strong>
                           Poziom opanowania
                        </h3>
                     </div>
                  </div>
                  <LessonTitle label={`${lesson.lesson_name}`} />
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
                           onClick={() => history.push(location.pathname + '/typing')}
                           styles={{ width: '100%' }}
                        />
                     </div>
                  </div>
               </>
            )}
         </Style>
      </>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: 1fr 3fr 1fr;
   grid-template-rows: 0.5fr auto;
   gap: 1rem 1rem;

   .stats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: ${colors.gray4};
      h3 {
         font-weight: normal;
      }
   }

   .lesson {
      grid-column: span 2;
      align-self: center;
      display: grid;
      grid-template-rows: 0.3fr 0.7fr;
      position: relative;
      height: 100%;
      margin-right: 2rem;

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
      display: grid;
      grid-template-rows: 60% 40%;

      .buttons {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
      }
   }
`;

export default SingleLesson;
