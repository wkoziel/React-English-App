import React from 'react';
import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import { fonts, colors } from '../../../style';
import RepeatImage from '../../../assets/repeat.svg';

const Step1 = () => {
   return (
      <Style className="container page">
         <div className="Main white-box">
            <div className="content">
               <h1>Witaj w powtórce</h1>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla dignissim posuere. Praesent
                  id vulputate neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas.
               </p>
               <h5 className="green">Twój zestaw zawiera 54 pojęcia</h5>
            </div>
         </div>
         <div className="Input">
            <button type="button" className="option" onClick={() => {}}>
               <h2>Szybka powrórka</h2>
               <h3>10 pojęć</h3>
            </button>
            <button type="button" className="option" onClick={() => {}}>
               <h2>Normalna powrórka</h2>
               <h3>20 pojęć</h3>
            </button>
            <button type="button" className="option" onClick={() => {}}>
               <h2>Wymagająca powrórka</h2>
               <h3>30 pojęć</h3>
            </button>
            <button type="button" className="option" onClick={() => {}}>
               <h2>Hardkorowa powrórka</h2>
               <h3>40 pojęć</h3>
            </button>
         </div>
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   height: 90vh;

   .Main {
      margin-top: 1rem;
      height: 100%;
      background: url(${RepeatImage}) 100% 50% no-repeat ${colors.white};
      .content {
         height: 100%;
         width: 60%;
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         background-color: white;

         h1 {
            font-size: 4.5rem;
         }

         p {
            font-size: 1.5rem;
            color: ${colors.gray2};
         }

         h5 {
            font-size: 2rem;
         }
      }
   }

   .Input {
      grid-area: Input;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      align-items: center;
      justify-content: center;
      gap: 1rem 1rem;
      padding-top: 2rem;

      .option {
         background-color: ${colors.white};
         border: 1px solid ${colors.gray1};
         border-left: 10px solid ${colors.green};
         border-radius: 10px;
         padding: 0.5rem;
         margin: 0.5rem;
         cursor: pointer;
         transition: all 0.2s;
         display: flex;
         justify-content: space-between;
         align-items: center;

         h2 {
            text-align: start;
            font-family: ${fonts.nova};
            font-weight: 500;
            text-transform: capitalize;
            color: ${colors.gray4};
            font-size: 2rem;
         }
         h3 {
            color: ${colors.gray2};
            font-size: 1.25rem;
         }

         &:hover {
            border-left: 20px solid ${colors.green};
         }
      }
   }
`;

export default Step1;
