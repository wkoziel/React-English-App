import React, { useState } from 'react';
import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { colors } from '../../../style';
import Typing from '../../../assets/typing.svg';
import RadioButtons from '../../../components/RadioButtons';
import Button from '../../../components/Button';
import { routes } from '../../../routes';

const timesOptions = ['2 razach', '3 razach', '4 razach'];
const languageOptions = ['Polski', 'Angielski'];

const Step1 = ({ onSubmit = null }) => {
   const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
   const [selectedTimes, setSelectedTimes] = useState(timesOptions[0]);

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
                  {/* MAIN */}
                  <div className="Welcome">
                     <h1>Rozpocznij naukę przez wpisywanie!</h1>
                  </div>
                  <div className="Image">
                     <img src={Typing} alt="" />
                  </div>
                  <div className="Settings">
                     <RadioButtons
                        label="Język pisania:"
                        options={languageOptions}
                        selected={selectedLanguage}
                        setSelected={setSelectedLanguage}
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
                  {/* MAIN END */}
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
      grid-template-rows: 0.1fr 1.8fr;
      gap: 1rem 0px;
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
      padding: 1rem 2rem;
      background-color: ${colors.white};
      border-radius: 20px;

      .subcontainer {
         display: grid;
         grid-template-columns: 1fr 1fr;
         grid-template-rows: 0.5fr 2fr 0.8fr;
         grid-auto-flow: row;
         gap: 1rem 2rem;
         grid-template-areas:
            'Welcome Welcome'
            'Image Settings'
            'Button Button';
      }

      .Welcome {
         grid-area: Welcome;
         justify-self: center;
         font-size: 1.7em;
      }

      .Image {
         grid-area: Image;
      }

      .Settings {
         grid-area: Settings;
         display: grid;
         grid-template-columns: 1fr 1fr;
         align-items: center;
         justify-content: center;

         border: 3px solid ${colors.green};
         border-radius: 20px;
         padding: 1rem;
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
