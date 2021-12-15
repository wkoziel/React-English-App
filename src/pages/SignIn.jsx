import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { colors, fonts } from '../style';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import image1 from '../assets/login-1.svg';
import image2 from '../assets/login-2.svg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signIn } from '../api/api';
import { AnimatePresence, motion } from 'framer-motion';
import transitions from '../helpers/transitions';
import { useGlobalContext } from '../context/global';
import { loginStatus } from '../constants/data';
import Error from '../components/Error';
import { useState } from 'react';
import { Redirect } from 'react-router';
import clsx from 'clsx';

const SignIn = () => {
   const { logIn, isAuth } = useGlobalContext();
   const [isLoading, setIsLoading] = useState(false);
   const [message, setMessage] = useState('');

   const schema = yup.object().shape({
      login: yup.string().required('Podaj swój login'),
      password: yup.string().required('Podaj swoje hasło'),
   });

   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data) => {
      try {
         setIsLoading(true);
         const response = await signIn(data);
         if (response.data.status) {
            const { status } = response.data;
            if (status === loginStatus.success) logIn(data.login);
            else setMessage(status);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         {isAuth && <Redirect to={routes.lessons} />}
         <Navbar />
         <Style className="container">
            <AnimatePresence>
               <motion.div key="1-frame" {...transitions.fromLeft} className="box">
                  <h2>Ucz się korzystając z jednej z wielu metod!</h2>
                  <div></div>
                  <img src={image1} alt="" />
                  <p>
                     Skorzystaj z trzech atrakcyjnych sposobów nauki: fiszek, wpisywania oraz quizu. Potwierdzone
                     naukowo zostało, że gdy na pytania odpowiada się z pamięci, mózg pobudzany jest do przywoływania
                     wcześniej poznanej wiedzy.
                  </p>
               </motion.div>
               <motion.div key="2-frame" {...transitions.fromRight} className="right-side">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <h2 className="login">Zaloguj się</h2>
                     {message && <Error message={message} />}
                     <TextInput
                        name="login"
                        ref={register}
                        label="Login"
                        placeholder="Wprowadź login"
                        error={errors?.login?.message}
                     />
                     <TextInput
                        ref={register}
                        name="password"
                        label="Hasło"
                        placeholder="Wprowadź hasło"
                        type="password"
                        error={errors?.password?.message}
                     />
                     <div className="flex">
                        <Link to={routes.forgottenPassword}>Zapomniałem hasła</Link>
                     </div>
                     <Button label={clsx(isLoading ? 'Logowanie...' : 'Zaloguj się')} noArrow type="submit" />
                     <Link to={routes.signUp}>
                        Nie masz konta? <strong>Zarejestruj się</strong>
                     </Link>
                  </form>
               </motion.div>
               <motion.div key="3-frame" {...transitions.fromLeft} className="box">
                  <h2>Wypróbuj naszą aplikacje mobilną!</h2>
                  <div></div>
                  <img className="image2" src={image2} alt="" />
                  <p>
                     Jedziesz pociągiem i chcesz przetestować zdobytą wiedzę? Nie ma nic prostszego! Zapomnij o wożeniu
                     ciężkich zeszytów z języka angielskiego. Teraz w każdej chwili możesz uruchomić aplikację mobilną i
                     kontynuować zaczętą wcześniej naukę.
                  </p>
               </motion.div>
            </AnimatePresence>
         </Style>
      </>
   );
};

const Style = styled.div`
   display: grid;
   grid-template-columns: 0.7fr 0.3fr;
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
         right: -5%;
         height: 105%;
      }

      .image2 {
         right: 2%;
      }

      p {
         padding-top: 1rem;
         font-size: 1.25rem;
         color: ${colors.gray3};
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
            /* margin-top: 1rem; */
            align-self: center;
            width: 90%;
            background: ${colors.green};
            color: ${colors.white};
            justify-content: center;
            font-family: ${fonts.lato};
            font-size: 0.75rem;
         }

         .flex {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 15px;
            a {
               margin: 0;
               text-decoration: underline;
            }
         }
      }
   }
`;
export default SignIn;
