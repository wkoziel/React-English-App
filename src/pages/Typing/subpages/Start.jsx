import React from 'react';
import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { colors } from '../../../style';
import Typing from '../../../assets/typing.svg';
import RadioButtons from '../../../components/RadioButtons';

const Start = () => {
   return (
      <Style>
         <div class="container">
            <div class="Back">
               <GoBack label="Powrót do lekcji" link="/" />
            </div>
            <div class="Title">
               <LessonTitle label="1. Greetings" />
            </div>
            <div class="Top"></div>
            <div class="Main">
               <div class="subcontainer">
                  <div class="Welcome">
                     <h1>Rozpocznij naukę przez wpisywanie!</h1>
                  </div>
                  <div class="Image">
                     <img src={Typing} alt="" />
                  </div>
                  <div class="Settings">
                     <RadioButtons />
                  </div>
                  <div class="Button"></div>
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
      grid-template-rows: 0.3fr 1.7fr;
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
         grid-template-rows: 0.5fr 2fr 0.5fr;
         gap: 0.5rem 0.5rem;
         grid-auto-flow: row;
         padding: 1rem 2rem;
         grid-template-areas:
            'Welcome Welcome'
            'Image Settings'
            'Button Button';
      }

      .Welcome {
         grid-area: Welcome;
         justify-self: center;
      }

      .Image {
         grid-area: Image;
      }

      .Settings {
         grid-area: Settings;
      }

      .Button {
         grid-area: Button;
      }
   }
`;

export default Start;
