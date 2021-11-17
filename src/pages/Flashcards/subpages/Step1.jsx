import React, { useState } from 'react';
import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { colors } from '../../../style';
import image from '../../../assets/flashcards.svg';
import RadioButtons from '../../../components/RadioButtons';
import Button from '../../../components/Button';
import { routes } from '../../../routes';

const languageOptions = ['Polski', 'Angielski', 'Oba'];
const timeOptions = ['1 razie', '2 razach', '3 razach'];

const Step1 = ({ onSubmit = null }) => {
   const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
   const [selectedTimes, setSelectedTimes] = useState(timeOptions[0]);
   return (
      <Style>
         <div className="container">
            <div className="Back">
               <GoBack label="Powrót do lekcji" link={routes.lessons} />
            </div>
            <div className="Title">
               <LessonTitle label="1. Greetings" />
            </div>
            <div className="Top"></div>
            <div className="Main">
               <div className="subcontainer">
                  <div className="Welcome">
                     <h1>Rozpocznij naukę z pomocą fiszek!</h1>
                  </div>
                  <div className="Image">
                     <img src={image} alt="" />
                  </div>
                  <div className="Settings">
                     <RadioButtons
                        label="Język pisania:"
                        options={languageOptions}
                        selected={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                     />
                     <RadioButtons
                        label="Zaliczone po"
                        options={timeOptions}
                        selected={selectedTimes}
                        onChange={(e) => setSelectedTimes(e.target.value)}
                     />
                  </div>
                  <div className="Button">
                     <Button
                        label="Rozpocznij"
                        noArrow
                        onClick={() =>
                           onSubmit({
                              selectedTimes: timeOptions.indexOf(selectedTimes),
                              selectedLanguage: languageOptions.indexOf(selectedLanguage),
                           })
                        }
                     />
                  </div>
               </div>
            </div>
         </div>
      </Style>
   );
};

const Style = styled.div`
   .container {
      display: grid;
      grid-template-columns: 0.4fr 2.2fr 0.4fr;
      grid-template-rows: 0.2fr 0.8fr;
      gap: 1rem 1rem;
      grid-auto-flow: row;
      align-items: center;
      justify-content: center;
      grid-template-areas:
         'Back Top Title'
         'Main Main Main';
   }

   .Back {
      grid-area: Back;
   }

   .Title {
      grid-area: Title;
   }

   .Top {
      grid-area: Top;
   }

   .Main {
      grid-area: Main;
      background-color: ${colors.white};
      border-radius: 20px;

      .subcontainer {
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-template-rows: 0.5fr 2fr 0.8fr;
         align-items: center;
         justify-content: center;
         gap: 1rem 1rem;
         grid-auto-flow: row;
         grid-template-areas:
            'Welcome Welcome'
            'Image Settings'
            'Button Button';
      }

      .Welcome {
         grid-area: Welcome;
         justify-self: center;
         font-size: 1.7em;
         margin-bottom: 1rem;
      }

      .Image {
         grid-area: Image;
         justify-self: center;
      }

      .Settings {
         grid-area: Settings;
         display: grid;
         grid-template-columns: 1fr 1fr;
         align-items: center;
         justify-content: center;
         padding: 2rem 1rem;
         width: 90%;
         border: 3px solid ${colors.green};
         border-radius: 20px;
      }

      .Button {
         grid-area: Button;
         align-self: end;
         justify-self: center;
         button {
            background-color: ${colors.green};
            padding: 1rem 3rem;
            color: ${colors.white};
         }
      }
   }
`;

export default Step1;
