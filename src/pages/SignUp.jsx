import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { colors, fonts } from '../style';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import image1 from '../assets/register-1.svg';
import image2 from '../assets/login-2.svg';

const SignUp = () => {
   return (
      <>
         <Navbar />
         <Style className="container">
            <div className="box">
               <h1>Dołącz do jedynej takiej platformy!</h1>
               <div></div>
               <img src={image1} alt="" />
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla dignissim posuere. Praesent
                  id vulputate neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas.
               </p>
            </div>
            <div className="right-side">
               <form action="">
                  <h1 className="login">Dołącz do nas!</h1>
                  <TextInput label="Login" placeholder="user123" />
                  <TextInput label="Email" placeholder="user@gmail.com" type="email" />
                  <TextInput label="Hasło" placeholder="********" type="password" />
                  <TextInput label="Powtórz hasło" placeholder="********" type="password" />
                  <Button label="Zarejestruj się" noArrow type="submit" />
                  <Link to={routes.signIn}>
                     Masz już konto? <strong>Zaloguj się</strong>
                  </Link>
               </form>
            </div>
            <div className="box">
               <h1>Wypróbuj naszą aplikacje mobilną!</h1>
               <div></div>
               <img className="image2" src={image2} alt="" />
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fringilla dignissim posuere. Praesent
                  id vulputate neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas.
               </p>
            </div>
         </Style>
      </>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: 0.68fr 0.32fr;
   grid-template-rows: 1fr 1fr;
   height: 90vh;

   .box {
      align-self: center;
      width: 90%;
      height: 92%;
      display: grid;
      grid-template-columns: 0.7fr 0.3fr;
      grid-template-rows: 0.2fr 0.8fr;
      padding: 2rem;
      position: relative;
      div {
         grid-row: span 2;
         width: 100%;
      }

      img {
         position: absolute;
         bottom: 0;
         right: -8%;
         height: 110%;
      }

      .image2 {
         right: 2%;
         height: 105%;
      }

      p {
         padding-top: 1rem;
         font-size: 1.25rem;
         color: ${colors.gray2};
         align-self: center;
      }
   }

   .right-side {
      align-self: center;
      grid-row: span 2;
      form {
         display: flex;
         flex-direction: column;
         gap: 1rem;

         background: ${colors.white};
         border: 1px solid ${colors.gray1};
         box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
         border-radius: 20px;
         padding: 2rem;

         input {
            font-size: 1rem;
         }

         .login {
            text-align: center;
            margin-bottom: 1.5rem;
            font-weight: bolder;
         }

         a {
            text-align: center;
            margin-top: 1.5rem;
         }

         input[type='checkbox'] {
            width: 15px;
            height: 15px;
            margin: 0 10px 0;
         }

         button {
            margin-top: 1rem;
            align-self: center;
            width: 90%;
            background: ${colors.green};
            color: ${colors.white};
            justify-content: center;
            font-family: ${fonts.lato};
            font-size: 0.75rem;
         }
      }
   }
`;
export default SignUp;
