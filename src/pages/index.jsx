import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import BGYellow from '../assets/bg-1.svg';
import BGGreen from '../assets/bg-2.svg';
import BGRed from '../assets/bg-3.svg';
import WomanImg from '../assets/landing-1.svg';
import MobileImg from '../assets/mobile.svg';
import WebImg from '../assets/web.svg';
import { colors, fonts } from '../style';

const Home = () => {
   return (
      <>
         <Navbar active={0} />
         <BgWhite>
            <YellowBgContainer>
               <YellowContainer>
                  <div className="header">
                     <h1>
                        Witaj w <span className="green">Duckling</span>
                     </h1>
                     <h5>Jedynej takiej aplikacji do nauki angielskiego</h5>
                     <Button className="pulse">Rozpocznij!</Button>
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
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                  </TableBlock>
                  <TableBlock>
                     <div className="title">
                        <h5>Fiszki</h5>
                     </div>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                  </TableBlock>
                  <TableBlock>
                     <div className="title">
                        <h5>Fiszki</h5>
                     </div>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                     <p>
                        <div />
                        Ucz się poprzez zapamiętywanie i zgadywanie rewersów kart
                     </p>
                  </TableBlock>
               </div>
            </WhiteContainer>
            <GreenBgContainer>
               <PlatformContainer>
                  <h1>Wersja mobilna</h1>
                  <img src={MobileImg} alt="Kobieta z telefonem" />
                  <p>Na systemy XYZ, XYZ i XYZ</p>
                  <Button>Pobierz</Button>
               </PlatformContainer>
               <PlatformContainer>
                  <h1>Wersja mobilna</h1>
                  <img src={WebImg} alt="Mężczyzna na ekranie komputera" />
                  <p>Dostępna w każdej przeglądarce</p>
                  <Button>Rejestracja</Button>
               </PlatformContainer>
            </GreenBgContainer>
            <OurContainer>
               <OurTable style={{ background: `${colors.yellow}` }}>
                  <div className="avatar"></div>
                  <h4>Wojciech Kozieł</h4>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil hic molestias rerum suscipit rem
                     praesentium expedita nam ab officia impedit!
                  </p>
               </OurTable>
               <OurTable style={{ background: `${colors.green}` }}>
                  <div className="avatar"></div>
                  <h4>Dominika Limanówka</h4>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil hic molestias rerum suscipit rem
                     praesentium expedita nam ab officia impedit!
                  </p>
               </OurTable>
               <OurTable style={{ background: '#FD6584' }}>
                  <div className="avatar"></div>
                  <h4>Piotr Hadam</h4>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil hic molestias rerum suscipit rem
                     praesentium expedita nam ab officia impedit!
                  </p>
               </OurTable>
               <OurTable style={{ background: `${colors.purple}` }}>
                  <div className="avatar"></div>
                  <h4>Tatiana Cieślar</h4>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil hic molestias rerum suscipit rem
                     praesentium expedita nam ab officia impedit!
                  </p>
               </OurTable>
            </OurContainer>
            <RedBgContainer></RedBgContainer>
         </BgWhite>
      </>
   );
};

const BgWhite = styled.div`
   background-color: white;
`;

const YellowBgContainer = styled.div`
   background: url(${BGYellow}) 0% 50% no-repeat;
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
   padding: 4rem 1rem 2rem;
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

   p div {
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
   }
`;

export default Home;
