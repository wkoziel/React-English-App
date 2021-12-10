import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GoBack from '../components/GoBack';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { colors } from '../style';
import { AnimatePresence } from 'framer-motion';
import transitions from '../helpers/transitions';
import { motion } from 'framer-motion';

const Profile = () => {
   return (
      <AnimatePresence>
         <Navbar active={3} />
         <Style className="page container">
            <motion.div className="goback" key="goback" {...transitions.opacity}>
               <GoBack label="Powrót" />
            </motion.div>
            <motion.div className="profile white-box" key="profile" {...transitions.opacity}></motion.div>
            <motion.div className="stats" key="stats" {...transitions.opacity}>
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
            </motion.div>
            <motion.div className="thisweek" key="thisweek" {...transitions.opacity}>
               <h5>Twój tydzień</h5>
               <div className="white-box">
                  <Bar
                     data={{
                        labels: ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'],
                        datasets: [
                           {
                              label: '',
                              data: [5, 10, 20, 0, 0, 30, 20],
                              backgroundColor: colors.green,
                              borderRadius: 20,
                              borderSkipped: false,
                              barThickness: 10,
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
                     }}
                  />
               </div>
            </motion.div>
         </Style>
      </AnimatePresence>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: 0.7fr 0.3fr;
   gap: 1rem 1rem;
   grid-template-rows: 0.1fr 1fr 1fr;
   height: 90vh;

   .goback {
      grid-column: span 2;
   }

   .profile {
      grid-row: span 2;
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
`;

export default Profile;
