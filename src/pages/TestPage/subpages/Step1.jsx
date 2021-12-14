import styled from 'styled-components';
import GoBack from '../../../components/GoBack';
import LessonTitle from '../../../components/LessonTitle';
import { colors } from '../../../style';
import Test from '../../../assets/test.svg';
import Button from '../../../components/Button';
import { routes } from '../../../routes';
import { motion } from 'framer-motion';
import transitions from '../../../helpers/transitions';

const Step1 = ({ onSubmit = null }) => {
   return (
      <motion.div {...transitions.opacity} key="typing-1">
         <Style className="container page">
            <div className="Back">
               <GoBack label="Powrót do lekcji" link={routes.lessons} />
            </div>
            <div className="Top"></div>
            <div className="Title">
               <LessonTitle label="Witaj w teście!" />
            </div>
            <div className="Main box">
               <h1>Witaj w teście z lekcji!</h1>
               <div className="cols">
                  <div className="settings">
                     <h5>Witaj w podsumowaniu zdobytej wiedzy!</h5>
                     <p>
                        W tej sekcji sprawdź, czego nauczyłeś się i odpowiedz na pytania dotyczące poznanej lekcji.
                        Przystąp do testu dopiero wtedy, gdy czujesz, że dobrze poznałeś materiał, ucząc się za pomocą
                        fiszek i wpisywania.
                     </p>
                     <ul>
                        <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Pamiętaj, że:</p>
                        <li>Na wpisanie słówka masz tylko 10 sekund,</li>
                        <li>Aby zaliczyć lekcję, musisz odpowiedzieć poprawnie na każde pytanie,</li>
                        <li>Po zakończonym teście możesz zobaczyć, ile poprawnych odpowiedzi udzieliłeś,</li>
                        <li>Dopiero gdy zaliczysz test w 100%, możesz przejść do nauki kolejnej lekcji.</li>
                     </ul>
                     <p>Jednak nie bój się, test możesz powtórzyć tyle razy, ile będzie to potrzebne :)</p>
                     <p style={{ fontWeight: 'bold' }}>Powodzenia!</p>
                  </div>
                  <img src={Test} alt="" />
               </div>
               <Button label="Rozpocznij" noArrow onClick={() => onSubmit()} />
            </div>
         </Style>
      </motion.div>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: repeat(12, 1fr);
   grid-template-rows: 0.2fr auto;
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
      padding: 0.5rem 1rem;
      .cols {
         position: relative;
         display: grid;
         grid-template-columns: 1fr;
         align-items: center;
         justify-content: center;
         img {
            position: absolute;
            width: 500px;
            right: 4rem;
            bottom: 2rem;
            z-index: 0;
            text-overflow: ellipsis;
         }
      }

      .settings {
         border: 3px solid ${colors.green};
         border-radius: 20px;
         display: flex;
         justify-content: center;
         flex-direction: column;
         padding: 2rem 3rem;
         font-size: 14px;
         margin: 0.5rem 5rem 2rem;
         p {
            z-index: 1;
         }
         ul {
            padding: 1rem 1rem 1rem 2rem;
            margin-bottom: 1rem;
            background: ${colors.background};
            width: fit-content;
            border-radius: 10px;
         }
      }

      button {
         background-color: ${colors.green};
         color: ${colors.white};
      }
   }
`;

export default Step1;
