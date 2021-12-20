import React from 'react';
import styled from 'styled-components';
import { fonts, colors } from '../../../style';
import RepeatImage from '../../../assets/repeat.svg';
import RadioButton from '../../../components/RadioButton';
import { useForm } from 'react-hook-form';

const Step1 = ({ setQuantity = null, nextStep = null, setLanguage = null, words = null }) => {
   const onClick = (q) => {
      setQuantity(q);
   };

   const onSubmit = (data) => {
      nextStep(data.language);
   };

   const { handleSubmit, register } = useForm({
      mode: 'onChange',
   });

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Style className="container page">
            <div className="Main white-box">
               <div className="content">
                  <h1>Witaj w powtórce</h1>
                  <p>
                     Przygotowaliśmy dla Ciebie indywidualny zestaw słówek do nauki, bazując na tym czego dawno nie
                     powtarzałeś. Wybierz odpowiednią dla ciebię opcję i kontynuuj naukę, która pozwoli ci utrwalić
                     pojęcia.
                  </p>
                  <h5 className="green">Twój zestaw zawiera {words} pojęć</h5>
                  <div className="radiobuttons">
                     <p>Język wprowadzania:</p>
                     <RadioButton label="Angielski" value={0} name="language" id="english" ref={register} checked />
                     <RadioButton label="Polski" value={1} name="language" id="polish" ref={register} />
                  </div>
               </div>
            </div>
            <div className="Input">
               <button
                  type="submit"
                  className={`${words < 10 && 'disabled'} option`}
                  onClick={() => onClick(10)}
                  disabled={words < 10}
               >
                  {words < 10 ? (
                     <h3>Niewystarczająca ilość przerobionych pojęć</h3>
                  ) : (
                     <>
                        <h2>Szybka powtórka</h2>
                        <h3>10 pojęć</h3>
                     </>
                  )}
               </button>
               <button
                  type="submit"
                  className={`${words < 20 && 'disabled'} option`}
                  onClick={() => onClick(20)}
                  disabled={words < 20}
               >
                  {words < 20 ? (
                     <h3>Niewystarczająca ilość przerobionych pojęć</h3>
                  ) : (
                     <>
                        <h2>Normalna powtórka</h2>
                        <h3>20 pojęć</h3>
                     </>
                  )}
               </button>
               <button
                  type="submit"
                  className={`${words < 30 && 'disabled'} option`}
                  onClick={() => onClick(30)}
                  disabled={words < 30}
               >
                  {words < 30 ? (
                     <h3>Niewystarczająca ilość przerobionych pojęć</h3>
                  ) : (
                     <>
                        <h2>Wymagająca powtórka</h2>
                        <h3>30 pojęć</h3>
                     </>
                  )}
               </button>
               <button
                  type="submit"
                  className={`${words < 40 && 'disabled'} option`}
                  onClick={() => onClick(40)}
                  disabled={words < 40}
               >
                  {words < 40 ? (
                     <h3>Niewystarczająca ilość przerobionych pojęć</h3>
                  ) : (
                     <>
                        <h2>Hardkorowa powtórka</h2>
                        <h3>40 pojęć</h3>
                     </>
                  )}
               </button>
            </div>
         </Style>
      </form>
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
            padding-left: 1rem;
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

   .disabled {
      border-left: 1px solid ${colors.gray1} !important;
      h2,
      h3 {
         color: ${colors.gray1} !important;
         font-size: 1.5rem !important;
      }
   }
   .radiobuttons {
      display: flex;
      align-items: center;
      p {
         margin: 0;
         color: ${colors.black} !important;
         font-size: 1.25rem !important;
      }
   }
`;

export default Step1;
