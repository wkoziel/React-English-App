import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import BGYellow from '../assets/bg-1.svg';
import BGGreen from '../assets/bg-2.svg';
import BGRed from '../assets/bg-3.svg';
import WomanImg from '../assets/landing-1.svg';
import MobileImg from '../assets/mobile.svg';
import Wojtek from '../assets/wojtek.svg';
import Doma from '../assets/doma.svg';
import Piotrek from '../assets/piotrek.svg';
import Tatiana from '../assets/tatiana.svg';
import { routes } from '../routes';
import WebImg from '../assets/web.svg';
import { colors, fonts } from '../style';
import { useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import transitions from '../helpers/transitions';

const Home = () => {
   const history = useHistory();
   return (
      <AnimatePresence>
         <Navbar active={0} />
         <BgWhite {...transitions.opacity} key="bg-1">
            <YellowBgContainer>
               <YellowContainer>
                  <div className="header">
                     <h1>
                        Witaj w <span className="green">Duckling</span>
                     </h1>
                     <h5>Jedynej takiej aplikacji do nauki angielskiego</h5>
                     <Button className="pulse" onClick={() => history.push(routes.signUp)}>
                        Rozpocznij!
                     </Button>
                  </div>
                  <WomanImage src={WomanImg} alt="Kobieta" className="pulseReversed" />
               </YellowContainer>
            </YellowBgContainer>

            <WhiteContainer>
               <h2>Ucz się korzystając z jednej z metod:</h2>
               <div>
                  <TableBlock>
                     <div className="title">
                        <h5>Fiszki</h5>
                     </div>

                     <p>
                        <span />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>

                     <p>
                        <span />
                        Metoda polecana jest do rozpoczęcia nauki z danej kategorii
                     </p>
                     <p>
                        <span />
                        Dzięki swojej prostocie pozwala na łatwe zapamiętywanie nowopoznanych pojęć
                     </p>
                  </TableBlock>
                  <TableBlock>
                     <div className="title">
                        <h5>Wpisywanie</h5>
                     </div>
                     <p>
                        <span />
                        Ucz sie przez wpisywanie pełnych definicji słówek bezpośrednio do aplikacji z wykorzystaniem
                        klawiatury
                     </p>
                     <p>
                        <span />
                        Metoda ta wymusza duże zaangażowanie osoby uczącej się co sprawia, że poznane pojęcia dobrze
                        zapadają w pamięć
                     </p>
                  </TableBlock>
                  <TableBlock>
                     <div className="title">
                        <h5>Quiz</h5>
                     </div>
                     <p>
                        <span />
                        Ucz się za pomocą quizu, w którzym wybierasz jedną z czterech wyświetlanych definicji
                        wylosowanych z danej lekcji
                     </p>
                     <p>
                        <span />
                        Metoda pozwala w łatwy sposób odświeżyć poznane wcześniej słówka i kontynuować naukę
                     </p>
                  </TableBlock>
               </div>
            </WhiteContainer>
            <GreenBgContainer>
               <PlatformContainer>
                  <h1>Wersja mobilna</h1>
                  <img src={MobileImg} alt="Kobieta z telefonem" />
                  <p>Na systemy Andorid oraz iOS.</p>
                  <Button>Pobierz</Button>
               </PlatformContainer>
               <PlatformContainer>
                  <h1>Wersja webowa</h1>
                  <img src={WebImg} alt="Mężczyzna na ekranie komputera" />
                  <p>Dostępna w każdej przeglądarce.</p>
                  <Button onClick={() => history.push(routes.signUp)}>Rejestracja</Button>
               </PlatformContainer>
            </GreenBgContainer>
            <OurContainer>
               <OurTable style={{ background: `${colors.yellow}` }}>
                  <div className="avatar">
                     <img src={Wojtek} alt="Wojtek" />
                  </div>
                  <h4>Wojciech Kozieł</h4>
                  <h5>Web app &amp; Design</h5>
                  <p>
                     Projekt interfejsu użytkownika oraz development aplikacji webowej Duckling z wykorzystaniem
                     biblioteki ReactJS.
                  </p>
               </OurTable>
               <OurTable style={{ background: `${colors.green}` }}>
                  <div className="avatar">
                     <img src={Doma} alt="Dominika" />
                  </div>
                  <h4>Dominika Limanówka</h4>
                  <h5>Mobile app &amp; Design</h5>
                  <p>
                     Projekt interfejsu użytkownika oraz development aplikacji mobilnej Duckling z wykorzystaniem języka
                     Flutter.
                  </p>
               </OurTable>
               <OurTable style={{ background: '#FD6584' }}>
                  <div className="avatar">
                     <img src={Piotrek} alt="Piotrek" />
                  </div>
                  <h4>Piotr Hadam</h4>
                  <h5>Backend &amp; Security</h5>
                  <p>Projekt bazy danych oraz implementacja REST API z wykorzystaniem platformy Microsoft Azure.</p>
               </OurTable>
               <OurTable style={{ background: `${colors.purple}` }}>
                  <div className="avatar">
                     <img src={Tatiana} alt="Tatiana" />
                  </div>
                  <h4>Tatiana Cieślar</h4>
                  <h5>Backend &amp; Content</h5>
                  <p>Przygotowanie zbioru danych do nauki oraz rejestracja i zabezpieczenie API w chmurze.</p>
               </OurTable>
            </OurContainer>
            <RedBgContainer></RedBgContainer>
         </BgWhite>
      </AnimatePresence>
   );
};

const BgWhite = styled(motion.div)`
   background-color: white;
`;

const YellowBgContainer = styled.div`
   background: url(${BGYellow}) 50% 70% no-repeat;
   height: 1000px;
`;

const RedBgContainer = styled.div`
   background: url(${BGRed}) 0% 0% no-repeat;
   height: 150px;
`;

const GreenBgContainer = styled.div`
   background: url(${BGGreen}) no-repeat;
   height: 1300px;
   display: flex;
   justify-content: center;
`;

const YellowContainer = styled.div`
   height: 700px;
   width: 100%;
   position: relative;

   .header {
      position: absolute;
      left: 5%;
      top: 30%;
      text-align: center;
      h1 {
         font-size: 3.9rem;
      }
      h5 {
         font-size: 1.75rem;
         font-weight: normal;
         margin-bottom: 3rem;
      }
   }
`;

const WomanImage = styled.img`
   position: absolute;
   right: 0;
   bottom: 10%;
   width: 800px;
`;

const Button = styled.button`
   background: ${colors.green};
   border: none;
   font-family: ${fonts.nova};
   cursor: pointer;
   font-size: 2rem;
   color: white;
   padding: 1rem 2rem;
   border-radius: 5px;
`;

const WhiteContainer = styled.div`
   height: 550px;
   width: 100%;
   position: relative;
   text-align: center;

   h2 {
      margin-bottom: 6rem;
   }

   & > div {
      display: flex;
      justify-content: space-evenly;
   }
`;

const TableBlock = styled.div`
   width: calc(100% / 3 - 200px);
   background: ${colors.background};
   position: relative;
   padding: 4rem 1rem 0.25rem;
   border-radius: 15px;
   transition: all 0.2s;

   &:hover {
      transform: scale(1.1);
   }

   .title {
      background-color: ${colors.green};
      color: white;
      width: 70%;
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 15px;
   }

   p span {
      background-color: ${colors.green};
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 1rem;
   }
`;

const PlatformContainer = styled.div`
   text-align: center;
   padding-top: 15rem;
   width: calc(100% / 2 - 100px);
   & > img {
      width: 100%;
      max-height: 400px;
      margin: 1rem 0;
   }
`;

const OurContainer = styled.div`
   height: 550px;
   width: 100%;
   text-align: center;
   display: flex;
   justify-content: space-around;
   padding-top: 8rem;
`;

const OurTable = styled.div`
   width: calc(100% / 4 - 100px);
   position: relative;
   padding: 3rem 0.5rem 1rem;
   border-radius: 15px;
   color: white;
   height: 250px;
   h4 {
      font-size: 1.4rem;
      margin: 1rem 0 0;
   }
   h5 {
      font-size: 1.2rem;
      margin: 0.25rem;
      font-weight: 500;
   }
   p {
      font-weight: 500;
      font-size: 1.1rem;
   }

   .avatar {
      background-color: inherit;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid white;
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
   }
`;

export default Home;
