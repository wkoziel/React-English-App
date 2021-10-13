import React from 'react';
import styled from 'styled-components';
import img from '../assets/undraw_Lost_online_re_upmy.svg';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

const SignIn = () => {
   return (
      <Style>
         <div className="container">
            <div className="column">
               <form className="login-box">
                  <h4>Zaloguj się tutaj:</h4>
                  <label htmlFor="">E-mail</label>
                  <input type="email" name="email" placeholder="email@webiste.com" required />
                  <label htmlFor="">Hasło</label>
                  <input type="password" name="password" placeholder="Min. 8 znaków" required />
                  <label>
                     <input type="checkbox" name="remember" />
                     Remember me
                  </label>
                  <button type="button">Zaloguj</button>
                  <span>
                     Nie masz konta?<Link to={routes.signUp}>Zarejestruj się!</Link>
                  </span>
               </form>
            </div>
            <div className="column">
               <img src={img} alt="Lost online undrew" />
            </div>
         </div>
      </Style>
   );
};

const Style = styled.div`
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   .container {
      height: 90vh;
      width: 80vw;
      background-color: #fff;
      display: flex;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
      border-radius: 20px;
   }
   .column {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
   }
   .login-box {
      display: grid;
      gap: 5px;
      width: 50%;
   }
`;
export default SignIn;
