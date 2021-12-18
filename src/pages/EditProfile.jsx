/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import GoBack from '../components/GoBack';
import clsx from 'clsx';
import { colors, fonts } from '../style';
import ChangePassword from '../components/ChangePassword';
import EditUserData from '../components/EditUserData';
import { getUser } from '../api/api';
import { useGlobalContext } from '../context/global';
import Loading from '../components/Loading';
import { AnimatePresence, motion } from 'framer-motion';
import ChangeDailyGoal from '../components/ChangeDailyGoal';
import ResetAccount from '../components/ResetAccount';
import DeleteAccount from '../components/DeleteAccount';
import transitions from '../helpers/transitions';
import FileUpload from '../components/FileUpload';
import { navlinks } from '../constants/data';

const EditProfile = () => {
   const [step, setStep] = useState(0);
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);

   const { username } = useGlobalContext();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getUser(username);
            if (response.data) setUser(response.data);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   const generateStep = () => {
      switch (step) {
         case 0:
            return <EditUserData user={user} />;
         case 1:
            return <FileUpload />;
         case 2:
            return <ChangePassword />;
         case 3:
            return <ChangeDailyGoal dailyGoal={user.daily_goal} />;
         case 4:
            return <ResetAccount />;
         case 5:
            return <DeleteAccount />;
         default:
            break;
      }
   };

   return (
      <AnimatePresence>
         <Navbar active={3} />
         <motion.div {...transitions.opacity}>
            <Style className="container page">
               {isLoading ? (
                  <Loading />
               ) : (
                  <>
                     <GoBack label="Powrót" />
                     <div className="content">
                        <div className="nav">
                           {navlinks.map((l, i) => (
                              <button key={i} type="button" className="white-box" onClick={() => setStep(i)}>
                                 <h5 className={clsx(step === i && 'active')}>{l}</h5>
                              </button>
                           ))}
                        </div>
                        <div className="options white-box">{generateStep()}</div>
                     </div>
                  </>
               )}
            </Style>
         </motion.div>
      </AnimatePresence>
   );
};

const Style = styled.div`
   .content {
      margin-top: 1rem;
      display: grid;
      gap: 1rem 1rem;
      grid-template-columns: 0.25fr 0.75fr;
      height: 100%;

      .nav {
         button {
            border: inherit;
            margin-bottom: 1rem;
            width: 100%;
            cursor: pointer;
         }

         h5 {
            font-weight: normal;
            text-align: left;
            color: ${colors.gray3};
         }
         .active {
            font-weight: bold;
            color: ${colors.black};
         }
      }

      .options {
         display: flex;
         justify-content: center;
         align-items: center;
      }

      form {
         display: flex;
         flex-direction: column;
         gap: 1rem;
         width: 70%;
         border-radius: 20px;
         padding: 2rem;

         input {
            font-size: 1rem;
         }

         .login {
            font-weight: bolder;
            margin: 0;
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

         .radiobuttons {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0.25rem 0;
            span {
               margin: 0 10px 0 0;
               justify-self: flex-start;
            }
         }

         button {
            margin-top: 2rem;
            align-self: end;
            width: 30%;
            background: ${colors.green};
            color: ${colors.white};
            justify-content: center;
            font-family: ${fonts.lato};
            font-size: 0.75rem;
         }

         .flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            a {
               margin: 0;
            }
         }
         p {
            margin: 0.25rem 0;
            font-size: 14px;
         }

         .steps {
            display: flex;
            justify-content: space-between;
         }
      }
   }
`;

export default EditProfile;
