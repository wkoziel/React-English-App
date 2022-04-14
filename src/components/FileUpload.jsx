import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/global';
import uploadFileToBlob from '../helpers/azureBlob';
import styled from 'styled-components';
import { colors } from '../style';
import Button from '../components/Button';
import { deleteUserPhoto, getUserPhoto, userChangePhoto } from '../api/api';
import clsx from 'clsx';
import { routes } from '../routes';
import { useHistory } from 'react-router-dom';
import { useModalContext } from './Modal';
import avatar from '../assets/avatar-female.svg';

const url = 'https://limistorage.blob.core.windows.net/profile-pics/';

const FileUpload = () => {
   const { username } = useGlobalContext();
   const [fileSelected, setFileSelected] = useState(null);
   const [file, setFile] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [userPhoto, setUserPhoto] = useState(avatar);

   const history = useHistory();

   const { showModal } = useModalContext();

   const ref = useRef();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const responseUser = await getUserPhoto(username);
            if (responseUser.data) setUserPhoto(responseUser.data.photo);
         } catch (error) {
            console.error(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, []); //eslint-disable-line

   const [uploading, setUploading] = useState(false);
   const [inputKey, setInputKey] = useState(Math.random().toString(36));
   const [error, setError] = useState('');

   const onFileChange = (e) => {
      setError('');
      if (!['jpg', 'png', 'jpeg'].includes(e.target.files[0].name.split('.')[1])) {
         setError('Zły format pliku');
         return;
      }
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onabort = () => console.error('file reading was aborted');
      reader.onerror = () => console.error('file reading has failed');
      if (file) reader.readAsDataURL(file);
      reader.onload = () => {
         const binaryStr = reader.result;
         setFileSelected({ binary: binaryStr, file });
      };

      const myFile = new File([e.target.files[0]], `${username}_profilepic.jpeg`);
      setFile(myFile);
   };

   const onFileUpload = async () => {
      try {
         setUploading(true);
         await uploadFileToBlob(file);
         setFileSelected(null);
         setUploading(false);
         setInputKey(Math.random().toString(36));
         const response = await userChangePhoto({ login: username, photo: `${url}${username}_profilepic.jpeg` });
         if (response.data) showModal('Zmiana avatara', response.data.status);
      } catch (error) {
         console.log(error);
      } finally {
         history.push(routes.profile);
      }
   };

   const changeToDefault = async () => {
      try {
         const response = await deleteUserPhoto({ login: username });
         if (response.data) showModal('Usuwanie awatara', response.data.status);
      } catch (error) {
         console.log(error);
      } finally {
         history.push(routes.profile);
      }
   };

   return (
      <Style>
         <h2>Zmień swoje zdjęcie profilowe</h2>
         <p>Tutaj możesz uaklualnić swoje zdjęcie profilowe</p>
         <div>
            <img src={fileSelected?.binary || userPhoto} alt="Zdjęcie użytkownika" />
            <div>
               <h5 className="red">{error}</h5>
               <h5>{fileSelected?.file?.name || 'Nie wybrano żadnego zdjęcia'}</h5>
               <button className="fileBtn" type="button" onClick={() => ref.current.click()}>
                  Dodaj nowy plik
               </button>
               <Button
                  label={clsx(uploading ? 'Wysyłanie..' : 'Wyślij plik')}
                  disabled={!fileSelected?.file?.name || isLoading}
                  noArrow
                  onClick={() => onFileUpload()}
               />
            </div>
         </div>
         <button onClick={() => changeToDefault()}>
            <h5>Przywróć domyślnego awatara</h5>
         </button>

         <input type="file" onChange={onFileChange} key={inputKey || ''} ref={ref} style={{ display: 'none' }} />
      </Style>
   );
};

const Style = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   & > button {
      margin-top: 1rem;
      border: none;
      background: none;
      cursor: pointer;
      text-decoration: underline;
   }

   & > div {
      display: flex;
      gap: 3rem;
      background: rgba(20, 223, 176, 0.4);
      padding: 3rem;
      border-radius: 2rem;
      max-width: 700px;
      width: 100%;

      img:nth-child(1) {
         width: 200px;
         height: 200px;
         border-radius: 50%;
      }

      & > div {
         display: flex;
         flex-direction: column;
         justify-content: space-around;
         overflow: hidden;
         align-items: center;
      }
   }
   .fileBtn {
      border: none;
      background: none;
      outline: none;
      cursor: pointer;
      text-decoration: underline;
      color: ${colors.black};
      font-size: 1.5rem;
   }
`;

export default FileUpload;
