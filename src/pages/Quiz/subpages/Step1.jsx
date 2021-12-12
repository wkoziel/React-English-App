import React, { useState } from 'react';
import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { colors } from '../../../style';
import image from '../../../assets/quiz.svg';
import RadioButtons from '../../../components/RadioButtons';
import Button from '../../../components/Button';
import { routes } from '../../../routes';
import { motion } from 'framer-motion';
import { languageOptions, timesOptions } from '../../../constants/data';

const Step1 = ({ onSubmit = null }) => {
   const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
   const [selectedTimes, setSelectedTimes] = useState(timesOptions[0]);

   return (
      <motion.div>
         <Style className="container page">
            <div className="Back">
               <GoBack label="Powrót do lekcji" link={routes.lessons} />
            </div>
            <div className="Top"></div>
            <div className="Title">
               <LessonTitle label="Witaj w quizie!" />
            </div>
            <div className="Main box">
               <h1>Rozpocznij naukę z pomocą quizu!</h1>
               <div className="cols">
                  <img src={image} alt="" />
                  <div className="settings">
                     <RadioButtons
                        label="Język pisania:"
                        options={languageOptions}
                        selected={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                     />
                     <RadioButtons
                        label="Zaliczone po:"
                        options={timesOptions}
                        selected={selectedTimes}
                        setSelected={setSelectedTimes}
                        onChange={(e) => setSelectedTimes(e.target.value)}
                     />
                  </div>
               </div>
               <div className="Button">
                  <Button
                     label="Rozpocznij"
                     noArrow
                     onClick={() =>
                        onSubmit({
                           selectedTimes: timesOptions.indexOf(selectedTimes),
                           selectedLanguage: languageOptions.indexOf(selectedLanguage),
                        })
                     }
                  />
               </div>
            </div>
         </Style>
      </motion.div>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: 0.3fr auto;
   gap: 1rem 1rem;

   .Back,
   .Title {
      grid-column: span 2;
      display: flex;
      margin: auto;
   }

   .Top {
      grid-column: span 8;
   }

   .Main {
      grid-column: span 12;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 3rem;
      .cols,
      .settings {
         display: grid;
         grid-template-columns: repeat(2, 1fr);
      }

      .settings {
         border: 3px solid ${colors.green};
         border-radius: 20px;
      }

      button {
         background-color: ${colors.green};
         color: ${colors.white};
      }
   }
`;

export default Step1;
