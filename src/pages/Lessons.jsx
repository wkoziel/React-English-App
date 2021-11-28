import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import image from '../assets/lessons.svg';
import Button from '../components/Button';
import styled from 'styled-components';
import { colors } from '../style';
import { Link } from 'react-router-dom';
import arrow from '../assets/arrow-green.svg';
import { getAllLessons } from '../api/api';
import Loading from '../components/Loading';

const Lessons = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [allLessons, setAllLessons] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAllLessons();
            if (response.data) setAllLessons(response.data);
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
         {isLoading ? (
            <Loading />
         ) : (
            <Style className="container">
               <div className="small-box box">
                  <h2>Osiągnij swój wyznaczony cel!</h2>
                  <img className="right woman-img" src={image} alt="Kobieta z notatkami" />
                  <h3>
                     Pozostało <span className="green">25</span> słówek do opanowania
                  </h3>
               </div>

               <div className="small-box box">
                  <h2>Kontynuuj naukę</h2>
                  <div className="right circle">
                     <h1 className="procent">25%</h1>
                  </div>
                  <div className="bottom button">
                     <Button label="Lekcja 24" />
                  </div>
               </div>

               {/* BOX 3 */}
               <div className="big-box">
                  <h2>Wszystkie lekcje</h2>
                  <div className="lessons">
                     {allLessons.map((l) => (
                        <Link key={l.lesson_id} to={`/lesson/${l.lesson_id}`}>
                           <div className="lesson box">
                              <h2>{l.lesson_id + 1}.</h2>
                              <div className="title">
                                 <h3 className="no-margin">{l.lesson_name}</h3>
                                 <h5 className="no-margin">{l.words_count} nowych pojęć</h5>
                              </div>
                              <h2 className="end">100%</h2> {/*Kolumna z procentami*/}
                              <img className="end" src={arrow} alt="Arrow right" />
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>
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
