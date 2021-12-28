import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { colors, fonts } from '../style';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import image1 from '../assets/register-1.svg';
import image2 from '../assets/login-2.svg';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import transitions from '../helpers/transitions';
import { signUp } from '../api/api';
import clsx from 'clsx';
import Error from '../components/Error';
import { registerStatus } from '../constants/data';
import { useHistory } from 'react-router';
import RadioButton from '../components/RadioButton';
import { useModalContext } from '../components/Modal';

const SignUp = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [message, setMessage] = useState('');

   const history = useHistory();

   const { showModal } = useModalContext();

   const schema = yup.object().shape({
      login: yup
         .string()
         .required('Podaj swój login')
         .min(4, 'Login musi zawierać conajmniej 4 znaki')
         .max(15, 'Login może zawierac maksymalnie 15 znaków'),
      password: yup.string().required('Podaj swoje hasło').min(8, 'Hasło musi zawierać conajmniej 8 znaków'),
      repeatpassword: yup.string().required('Podaj hasło ponownie').min(8, 'Hasło musi zawierać conajmniej 8 znaków'),
      mail: yup.string().email('Podaj email w prawidłowym formacie').required('Podaj swój email'),
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
         if (data.password === data.repeatpassword) {
            setIsLoading(true);
            console.log(data);
            const response = await signUp(data);
            if (response.data.status) {
               const { status } = response.data;
               if (status === registerStatus.success) {
                  showModal(
                     'Aktywuj swoje konto',
                     'Na podany adres email wysłany został link aktywacyjny. Aktywuj konto aby móc się zalogować',
                  );
                  history.push(routes.signIn);
               } else setMessage(status);
            }
         } else {
            setMessage('Hasła nie są takie same');
         }
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Navbar />
         <Style className="container">
            <AnimatePresence>
               <motion.div key="1-frame" {...transitions.fromLeft} className="box">
                  <h2 className="pulse">Dołącz do jedynej takiej platformy!</h2>
                  <div></div>
                  <img src={image1} alt="" />
                  <p>
                     W obecnych czasach coraz bardziej odbiega się od tradycyjnych sposobów nauki, takich jak
                     przeglądanie zapisanych notatek czy korzystanie ze słowników. <br />
                     Uczniowie często decydują się na naukę online.
                     <br /> Tutaj z pomocą przychodzi platforma <strong className="green">Duckling</strong>,
                     <br /> która oferuje atrakcyjne sposoby nauki dla każdego.
                  </p>
               </motion.div>
               <motion.div key="2-frame" {...transitions.fromRight} className="right-side">
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <h2 className="login">Dołącz do nas!</h2>
                     {message && <Error message={message} />}
                     <TextInput
                        label="Login"
                        placeholder="user123"
                        ref={register}
                        name="login"
                        error={errors?.login?.message}
                     />
                     <TextInput
                        label="Email"
                        placeholder="user@gmail.com"
                        type="email"
                        ref={register}
                        error={errors?.mail?.message}
                        name="mail"
                     />
                     <TextInput
                        label="Hasło"
                        placeholder="********"
                        type="password"
                        ref={register}
                        name="password"
                        error={errors?.password?.message}
                     />
                     <TextInput
                        label="Powtórz hasło"
                        placeholder="********"
                        type="password"
                        ref={register}
                        name="repeatpassword"
                        error={errors?.repeatpassword?.message}
                     />
                     <div className="radiobuttons">
                        <p>Płeć:</p>
                        <RadioButton label="Mężczyzna" value="M" name="gender" id="male" ref={register} checked />
                        <RadioButton label="Kobieta" value="F" name="gender" id="female" ref={register} />
                        <RadioButton label="Nie chce podawać" value="N" name="gender" id="neutral" ref={register} />
                     </div>
                     <Button label={clsx(isLoading ? 'Rejestracja...' : 'Zarejestruj się')} noArrow type="submit" />
                     <Link to={routes.signIn}>
                        Masz już konto? <strong>Zaloguj się</strong>
                     </Link>
                  </form>
               </motion.div>
               <motion.div key="3-frame" {...transitions.fromLeft} className="box">
                  <h2 className="pulseReversed">Wypróbuj naszą aplikacje mobilną!</h2>
                  <div></div>
                  <img className="image2" src={image2} alt="" />
                  <p>
                     Korzystaj z <strong className="green">aplikacji mobilnej</strong> na dowolnym urządzeniu lub
                     skorzystaj ze strony internetowej na dowolnej przeglądarce. Wybierz swoją ulubioną i ucz się
                     nieważne, gdzie jesteś!
                  </p>
               </motion.div>
            </AnimatePresence>
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
         padding: 1rem 2rem;

         input {
            font-size: 1rem;
         }

         .login {
            text-align: center;
            margin-bottom: 1rem;
            font-weight: bolder;
         }

         a {
            text-align: center;
            margin-top: 0.5rem;
         }

         input[type='checkbox'] {
            width: 15px;
            height: 15px;
            margin: 0 10px 0;
         }

         button {
            align-self: center;
            width: 90%;
            background: ${colors.green};
            color: ${colors.white};
            justify-content: center;
            font-family: ${fonts.lato};
            font-size: 0.75rem;
         }
         .radiobuttons {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0.25rem 0;
            p {
               margin: 0;
               justify-self: flex-start;
            }
         }
      }
   }
`;
export default SignUp;
