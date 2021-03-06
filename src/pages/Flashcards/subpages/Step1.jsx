import React, { useState } from 'react';
import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { colors } from '../../../style';
import image from '../../../assets/flashcards.svg';
import RadioButtons from '../../../components/RadioButtons';
import Button from '../../../components/Button';
import { routes } from '../../../routes';
import { languageOptionsFlashcards, timesOptions } from '../../../constants/data';

const Step1 = ({ onSubmit = null }) => {
   const [selectedLanguage, setSelectedLanguage] = useState(languageOptionsFlashcards[0]);
   const [selectedTimes, setSelectedTimes] = useState(timesOptions[0]);

   return (
      <Style className="container page">
         <div className="Back">
            <GoBack label="Powrót do lekcji" link={routes.lessons} />
         </div>
         <div className="Top" />
         <div className="Title">
            <LessonTitle label="Witaj w fiszkach!" />
         </div>
         <div className="Main box">
            <h1>Rozpocznij naukę z pomocą fiszek!</h1>
            <div className="cols">
               <div className="settings">
                  <RadioButtons
                     label="Język na odwrocie:"
                     options={languageOptionsFlashcards}
                     selected={selectedLanguage}
                     onChange={(e) => setSelectedLanguage(e.target.value)}
                  />
                  <RadioButtons
                     label="Zaliczone po"
                     options={timesOptions}
                     selected={selectedTimes}
                     onChange={(e) => setSelectedTimes(e.target.value)}
                  />
               </div>
            </div>
            <Button
               label="Rozpocznij"
               noArrow
               onClick={() =>
                  onSubmit({
                     selectedTimes: timesOptions.indexOf(selectedTimes),
                     selectedLanguage: languageOptionsFlashcards.indexOf(selectedLanguage),
                  })
               }
            />
         </div>
      </Style>
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
      background: url(${image}) no-repeat 0% 50% ${colors.white};

      .cols,
      .settings {
         display: grid;
         grid-template-columns: repeat(2, 1fr);
      }

      .settings {
         grid-column: 2;
         border: 3px solid ${colors.green};
         border-radius: 20px;
         background: ${colors.white};
      }

      button {
         background-color: ${colors.green};
         color: ${colors.white};
      }
   }
`;

export default Step1;
